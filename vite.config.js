import {
    resolve
} from 'path'
import eslint from 'vite-plugin-eslint'

export default {
    build: {
        lib: {
            entry: [
                resolve(__dirname, 'src/index.js')
            ],
            name: 'Index',
            fileName: (format, name) => {
                if (format === 'es') {
                    return `${name}.js`
                }

                return `${name}.${format}.js`
            }
        },
        rollupOptions: {
            external: [],
        }
    },
    plugins: [eslint()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
}