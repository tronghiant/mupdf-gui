import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { VitePlugin } from "@electron-forge/plugin-vite";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: 'electron/icons/icon'
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({ setupIcon: 'electron/icons/icon.ico' }),
    new MakerZIP({}, ['darwin'])
  ],
  publishers: [],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          entry: 'electron/main.ts',
          config: 'vite.main.config.ts'
        },
        {
          entry: 'electron/preload.ts',
          config: 'vite.preload.config.ts'
        }
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.config.ts'
        }
      ]
    })
  ]
}

export default config;
