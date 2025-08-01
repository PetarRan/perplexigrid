import { useState, useEffect } from "react";
import { WidgetConfig } from "../components/widgets/util/WidgetUtil";
import { API } from "../../api/api";

/**
 * Custom hook to fetch widgets from Supabase
 * @param projectId - The ID of the project to fetch widgets for
 * @returns Object containing widgets, loading state, and refresh function
 */
export const useWidgets = (projectId?: string) => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getWidgetNameById = async (widgetId: string) => {
    const widgetData = await API.widgets.getById(widgetId);
    return widgetData?.name;
  };

  const fetchWidgets = async () => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const widgetsData = await API.widgets.getAll(projectId);

      // Sort widgets by position before formatting
      const sortedWidgets = widgetsData.sort(
        (a, b) => (a.position || 0) - (b.position || 0)
      );

      // Transform the API response to match the WidgetConfig format
      const formattedWidgets: WidgetConfig[] = sortedWidgets.map(
        (widget, index) => {
          // Set different heights based on widget type
          let height = 6;
          if (
            widget.widget_type === "KPI" ||
            widget.widget_type === "StatsCard"
          ) {
            height = 3; // Smaller height for simple widgets
          } else if (
            widget.widget_type === "LineChart" ||
            widget.widget_type === "BarChart"
          ) {
            height = 8; // Larger height for charts
          }

          // Use the index from sorted array for positioning
          const column = index % 2;
          const row = Math.floor(index / 2);

          return {
            id: widget.id,
            name: widget.name,
            type: widget.widget_type as any,
            data: widget.data as any,
            // Set x and y positions based on sorted position
            x: column * 6,
            y: row * 10,
            w: 6,
            h: height,
          };
        }
      );

      setWidgets(formattedWidgets);
      setError(null);
    } catch (err) {
      console.error("Error fetching widgets:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch widgets")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWidgets();
  }, [projectId]);

  return {
    widgets,
    loading,
    error,
    refresh: fetchWidgets,
    get: getWidgetNameById,
  };
};
