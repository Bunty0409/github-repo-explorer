export interface Props {
    owner: string;
    repoName: string;
}

export type CustomTooltipContext = {
    x?: string | number;
    y?: number;
    series: { name: string };
};

export interface RepoCardProps {
    repo: any;
    onExpand: () => void;
    isExpanded: boolean;
}

export interface TimeRangeSelectorTypes {
    onChange: (value: '1week' | '2weeks' | '1month') => void;
}

export interface AnalyticsState {
    data: Record<string, any>;
    loading: boolean;
    error: string | null;
}

export interface RepoState {
    list: any[];
    loading: boolean;
    error: string | null;
    timeRange: '1week' | '2weeks' | '1month';
    page: number;
}
