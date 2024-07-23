export interface Module<T> {
    component: () => JSX.Element;
    data: T;
    developedBy: string;
}
