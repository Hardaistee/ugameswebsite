// Inline blocking script to set theme before React hydration
// This prevents hydration mismatch and FOUC
export default function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        try {
                            const saved = localStorage.getItem('theme');
                            if (saved === 'light') {
                                document.documentElement.classList.remove('dark');
                            } else {
                                document.documentElement.classList.add('dark');
                            }
                        } catch (e) {
                            document.documentElement.classList.add('dark');
                        }
                    })();
                `,
            }}
        />
    )
}
