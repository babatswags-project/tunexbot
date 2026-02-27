import React from 'react';
import LegalPage from '../components/LegalPage';

const HowToLaunch = () => {
    return (
        <LegalPage title="How to Launch TunexBot">
            <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Command Line Arguments</h3>
            <p style={{ marginBottom: '1rem' }}>
                TunexBot can be launched with various arguments to control its behavior. Use the following flags to customize your session:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><strong>f</strong>: Launch in <strong>Manual Mode</strong>. The bot will open Google and let you take control while keeping fingerprinting and proxy protections active.</li>
                <li><strong>a</strong>: Launch in <strong>Ordered Mode</strong>. Sessions will run sequentially from the start of the range to the end of the user agent list.</li>
                <li><strong>session_X</strong>: Launch a specific session (e.g., <code>session_0</code>).</li>
                <li><strong>session_X-session_Y</strong>: Launch a <strong>Range</strong> of sessions (e.g., <code>session_10-session_20</code>).</li>
                <li><strong>[number]</strong>: Set the <strong>Concurrency</strong>. For example, <code>10</code> will keep 10 active bots running.</li>
            </ul>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Task Configuration (xpath.txt)</h3>
            <p style={{ marginBottom: '1rem' }}>
                The <code>xpath.txt</code> file defines what the bot actually does once it's on a page. Each task block starts with a search query:
            </p>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontFamily: 'monospace', color: '#ccc' }}>
                search: my search keyword<br />
                duration: 60-120<br />
                link: example.com<br />
                clickText: Click Here
            </div>
            <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>search:</strong> The starting keyword for Google/YouTube search.</li>
                <li><strong>duration:</strong> Min-Max seconds to spend on the page (e.g., <code>60-120</code>).</li>
                <li><strong>link:</strong> The hostname or URL fragment to look for (e.g., <code>youtube.com</code>).</li>
                <li><strong>clickText:</strong> The exact or partial visible text of the link to click.</li>
                <li><strong>link: any</strong>: Tells the bot to click any random link on the page instead of a specific one.</li>
            </ul>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Proxy Integration (proxies.txt)</h3>
            <p style={{ marginBottom: '1rem' }}>
                Add your proxies to <code>proxies.txt</code> to ensure each session uses a unique IP address. The bot automatically validates proxies before use.
            </p>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontFamily: 'monospace', color: '#ccc' }}>
                IP:PORT:USERNAME:PASSWORD
            </div>
            <p style={{ marginBottom: '1.5rem' }}>
                Supports both <code>:</code> and <code>;</code> as separators. If no valid proxies are found, the bot will fall back to your local network.
            </p>

            <h3 className="outfit-font" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Session Persistence</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                TunexBot automatically saves cookies and local storage for every session. When you relaunch a session (e.g., <code>session_5</code>), all previous login states and site data are restored, making it look like a continuous user journey.
            </p>
        </LegalPage>
    );
};

export default HowToLaunch;
