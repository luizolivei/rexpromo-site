import {defineNuxtConfig} from "nuxt/config";
import viteCompression from "vite-plugin-compression";

export default defineNuxtConfig({
    components: ["~/components/"],
    sourcemap: true,

    app: {
        head: {
            title: "sabore",
            htmlAttrs: {
                lang: "pt-BR"
            },

            meta: [
                {charset: "utf-8"},
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0, maximum-scale=5"
                },
                {
                    hid: "og:description",
                    name: "og:description",
                    content: "EDITAR"
                },
                {name: "format-detection", content: "telephone=no"}
            ],

            link: [
                {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
                {rel: "preload", as: "style", href: "/css/guia-icons.css"},
                {rel: "stylesheet", href: "/css/guia-icons.css"},
            ]
        }
    },

    css: ["~/assets/scss/main.scss"],

    routeRules: {
        "/admin/**": {ssr: false},
        "/auth/**": {ssr: false},
        '/api/**': { //TODO validar se isso realmente importa
            cors: true, ssr: true, isr: false
        },
    },

    // runtimeConfig: {
    //   public: {
    //     baseUrl: process.env.BASE_URL || "http://localhost",
    //   }
    // },

    experimental: {
        watcher: "parcel",
        emitRouteChunkError: false,
        //@ts-ignore
        sharedPrerenderData: true,
        componentIslands: {
            selectiveClient: true
        }
    },

    plugins: ["~/plugins/vuex.js"],

    //@ts-ignore
    modules: [
        "nuxt-server-utils",
        "nuxt-delay-hydration",
        "@nuxtjs/partytown",
        "nuxt-lazy-hydrate",
        "nuxt-swiper",
        "nuxt-schema-org",
        "@vueuse/nuxt",
        "@nuxt/devtools",
        "@nuxtjs/tailwindcss",
        "@nuxt/image",
        "nuxt-speedkit",
    ],

    tailwindcss: {
        configPath: "@/tailwind.config.js",
        cssPath: "@/assets/scss/main.scss"
    },

    devtools: {
        enabled: true
    },

    schemaOrg: {
        meta: {
            host: "https://rexpromo.com"
        }
    },


    image: {
        quality: 70,

        format: ['webp', 'jpg', 'png', 'jpeg', 'svg'],

        screens: {
            'xs': 320,
            'sm': 640,
            'md': 768,
            'lg': 1024,
            'xl': 1280,
            'xxl': 1536,
            '2xl': 1536
        }
    },

    nitro: {
        experimental: {
            websocket: true
        },
        compressPublicAssets: true
    },

    typescript: {
        strict: true
    },

    vite: {
        ssr: {
            external: [
                "sweetalert2",
                "axios",
            ]
        },
        plugins: [viteCompression()]
    },

    speedkit: {
        detection: {
            performance: true,
            browserSupport: true
        },

        performanceMetrics: {
            //@ts-ignore
            device: {
                hardwareConcurrency: {min: 2, max: 48},
                deviceMemory: {min: 2}
            },
            timing: {
                fcp: 800,
                dcl: 1200
            }
        },

        //@ts-ignore
        targetFormats: ["webp", "avif", "jpg|jpeg|png|gif"],

        componentAutoImport: false,
        componentPrefix: undefined,

        lazyOffset: {
            component: "0%",
            asset: "0%"
        }
    }
});
