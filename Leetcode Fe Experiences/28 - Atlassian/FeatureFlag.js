// https://codesandbox.io/p/sandbox/atlassian-2nd-round-forked-59odq8
// Mocked backend system
 
  class FeatureManager {
    constructor(ttl = 2000) {
      this.cache = {
        features: {},
        timestamp: 0
      };
      this.ttl = ttl;
      this.fetchPromise = null;
    }
    isCacheValid() {
      return Date.now() - this.cache.timestamp < this.ttl;
    }
    //Mock Backend API
    fetchAllFeatures() {
        console.log("Fetching features from backend...");
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              featureFoo: true,
              featureBar: false,
              enable_new_pricing: true,
              show_dialog_box: true
            });
          }, 100);
        });
    }
    getFeatureState(featureName, defaultValue = false) {
      // If valid cache exists, return from cache
      if (this.isCacheValid() && Object.keys(this.cache.features).length) {
        console.log(`[Cache] Returning ${featureName}`);
        return Promise.resolve(
          this.cache.features.hasOwnProperty(featureName)
            ? this.cache.features[featureName]
            : defaultValue
        );
      }
      // If a request is already in progress, return its promise
      if (this.fetchPromise) {
        console.log(`[Pending] Waiting for fetch to resolve for: ${featureName}`);
        return this.fetchPromise.then((features) =>
          features.hasOwnProperty(featureName) ? features[featureName] : defaultValue
        ).catch(() => defaultValue);
      }
  
      // Otherwise fetch and cache
      this.fetchPromise = this.fetchAllFeatures()
        .then((features) => {
          this.cache.features = features;
          this.cache.timestamp = Date.now();
          this.fetchPromise = null;
          return features;
        })
        .catch((err) => {
          console.error("Failed to fetch features:", err);
          this.fetchPromise = null;
          return {};
        });
  
      return this.fetchPromise.then((features) =>
        features.hasOwnProperty(featureName) ? features[featureName] : defaultValue
      );
    }
  }
  
  // Exported singleton for global use
  const featureManager = new FeatureManager();
  // Usage
  featureManager.getFeatureState('show_dialog_box', false).then((enabled) => {
    console.log('show_dialog_box:', enabled ? 'enabled' : 'disabled');
  });
  featureManager.getFeatureState('show_pricing_v2', false).then((enabled) => {
    console.log('show_pricing_v2:', enabled ? 'enabled' : 'disabled');
  });
  
  featureManager.getFeatureState('show_editor', false).then((enabled) => {
    console.log('show_editor:', enabled ? 'enabled' : 'disabled');
  });
  
  setTimeout(() => {
    featureManager.getFeatureState('enable_new_pricing', false).then((enabled) => {
      console.log('enable_new_pricing:', enabled ? 'enabled' : 'disabled');
    });
  }, 300);
  
  setTimeout(() => {
    featureManager.getFeatureState('enable_new_pricing', false).then((enabled) => {
      console.log('[AFTER TTL] enable_new_pricing:', enabled ? 'enabled' : 'disabled');
    });
  }, 3000);
  