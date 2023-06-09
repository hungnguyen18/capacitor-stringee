import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'vn.wellcare.capacitor.plugin.example',
  appName: 'CapacitorStringeeExample',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  },
  cordova: {},
  server: {
    iosScheme: 'nuxtmobile'
  }
}

export default config
