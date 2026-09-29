export default function DashboardLoading() {
    return (
        <main className="flex-1">
            <div className="container-page py-10">
                <div className="mb-8 h-8 w-32 animate-pulse rounded-sm bg-panel" />

                <div className="flex flex-col gap-6">
                    {/* create-link form */}
                    <div className="h-24 animate-pulse border border-line bg-panel" />

                    {/* links table rows */}
                    <div className="border border-line">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-6 border-b border-line px-4 py-4 last:border-0"
                            >
                                <div className="h-4 w-32 animate-pulse rounded-sm bg-panel" />
                                <div className="hidden h-4 flex-1 animate-pulse rounded-sm bg-panel sm:block" />
                                <div className="h-4 w-10 animate-pulse rounded-sm bg-panel" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}