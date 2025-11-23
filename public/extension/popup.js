document.addEventListener('DOMContentLoaded', () => {
  const providerSelect = document.getElementById('provider');
  const apiKeyInput = document.getElementById('apiKey');
  const modelInput = document.getElementById('model');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');
  const keyHelp = document.getElementById('keyHelp');

  const PROVIDER_DEFAULTS = {
    groq: {
      label: 'Groq API Key',
      placeholder: 'gsk_...',
      helpUrl: 'https://console.groq.com/keys',
      helpText: 'console.groq.com',
      defaultModel: 'llama-3.3-70b-versatile'
    },
    openai: {
      label: 'OpenAI API Key',
      placeholder: 'sk-...',
      helpUrl: 'https://platform.openai.com/api-keys',
      helpText: 'platform.openai.com',
      defaultModel: 'gpt-4o-mini'
    },
    gemini: {
      label: 'Gemini API Key',
      placeholder: 'AIza...',
      helpUrl: 'https://aistudio.google.com/app/apikey',
      helpText: 'aistudio.google.com',
      defaultModel: 'gemini-1.5-flash'
    }
  };

  // Load saved settings
  chrome.storage.local.get(['provider', 'groqApiKey', 'openaiApiKey', 'geminiApiKey', 'customModel'], (result) => {
    const currentProvider = result.provider || 'groq';
    providerSelect.value = currentProvider;
    updateUIForProvider(currentProvider);

    // Load key for current provider
    const keyName = `${currentProvider}ApiKey`;
    apiKeyInput.value = result[keyName] || '';

    if (result.customModel) {
      modelInput.value = result.customModel;
    }
  });

  // Handle provider change
  providerSelect.addEventListener('change', (e) => {
    const provider = e.target.value;
    updateUIForProvider(provider);

    // Try to load saved key for this provider
    chrome.storage.local.get([`${provider}ApiKey`], (result) => {
      apiKeyInput.value = result[`${provider}ApiKey`] || '';
    });
  });

  function updateUIForProvider(provider) {
    const config = PROVIDER_DEFAULTS[provider];
    apiKeyInput.placeholder = config.placeholder;
    keyHelp.innerHTML = `Get your key from <a href="${config.helpUrl}" target="_blank">${config.helpText}</a>`;
    modelInput.placeholder = `Default: ${config.defaultModel}`;
  }

  // Save settings
  saveBtn.addEventListener('click', () => {
    const provider = providerSelect.value;
    const apiKey = apiKeyInput.value.trim();
    const model = modelInput.value.trim();

    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }

    const settings = {
      provider: provider,
      customModel: model
    };

    // Save key specifically for this provider
    settings[`${provider}ApiKey`] = apiKey;

    chrome.storage.local.set(settings, () => {
      showStatus('Settings saved!', 'success');
      // Notify content script to reload settings
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "settingsUpdated" });
        }
      });
    });
  });

  function showStatus(message, type) {
    status.textContent = message;
    status.className = type;
    setTimeout(() => {
      status.textContent = '';
      status.className = '';
    }, 3000);
  }
});
