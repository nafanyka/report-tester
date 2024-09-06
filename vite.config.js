import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import dotenv from 'dotenv';


export default ({ mode }) => {
    const config = dotenv.config();
    let url = config.parsed.APP_URL;
    url = (new URL(url));
    url = url.hostname;

    return defineConfig({
        plugins: [
            laravel({
                input: ['resources/scss/app.scss', 'resources/js/app.js'],
                refresh: true,
            }),
        ],
        server: {
            hmr: {
                host: url,
            }
        },
    });
}
