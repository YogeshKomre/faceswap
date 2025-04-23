document.addEventListener('DOMContentLoaded', async () => {
    const elements = {
        sourceImage: document.getElementById('sourceImage'),
        targetMedia: document.getElementById('targetMedia'),
        sourcePreview: document.getElementById('sourcePreview'),
        targetPreview: document.getElementById('targetPreview'),
        targetVideo: document.getElementById('targetVideo'),
        swapButton: document.getElementById('swapButton'),
        downloadPngButton: document.getElementById('downloadPngButton'),
        downloadJpgButton: document.getElementById('downloadJpgButton'),
        imageQuality: document.getElementById('imageQuality'),
        outputCanvas: document.getElementById('outputCanvas'),
        sourceLoading: document.getElementById('sourceLoading'),
        targetLoading: document.getElementById('targetLoading'),
        mainLoading: document.getElementById('mainLoading'),
        statusMessage: document.getElementById('statusMessage'),
        downloadOptions: document.querySelector('.download-options'),
        container: document.querySelector('.container'),
        resultSection: document.querySelector('.result-section')
    };

    // Set theme colors
    const colors = {
        primary: '#3498db',
        success: '#2ecc71',
        warning: '#f1c40f',
        error: '#e74c3c',
        background: '#ecf0f1',
        containerBg: '#ffffff'
    };

    // Apply initial styles
    document.body.style.backgroundColor = colors.background;
    elements.container.style.backgroundColor = colors.containerBg;

    // Face swapping functions
    // ... existing face swap functions ...

    // Download handling
    function enableDownloadOptions() {
        elements.downloadOptions.style.display = 'flex';
        elements.resultSection.style.backgroundColor = '#f8f9fa';
        elements.resultSection.style.padding = '20px';
        elements.resultSection.style.borderRadius = '8px';
        elements.resultSection.style.marginTop = '20px';
    }

    function downloadImage(format, quality) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const link = document.createElement('a');
        link.download = `face-swap-${timestamp}.${format}`;
        link.href = elements.outputCanvas.toDataURL(`image/${format}`, quality);
        link.click();
    }

    // Event listeners
    elements.swapButton.addEventListener('click', async () => {
        try {
            updateStatus('Processing face swap...', 'warning');
            elements.mainLoading.style.display = 'block';
            elements.downloadOptions.style.display = 'none';
            elements.resultSection.style.backgroundColor = 'transparent';

            // ... existing face detection and swap code ...

            enableDownloadOptions();
            updateStatus('Face swap completed successfully', 'success');
        } catch (error) {
            updateStatus(error.message, 'error');
            console.error(error);
        } finally {
            elements.mainLoading.style.display = 'none';
        }
    });

    elements.downloadPngButton.addEventListener('click', () => {
        const quality = parseFloat(elements.imageQuality.value);
        downloadImage('png', quality);
    });

    elements.downloadJpgButton.addEventListener('click', () => {
        const quality = parseFloat(elements.imageQuality.value);
        downloadImage('jpeg', quality);
    });

    function updateStatus(message, type = 'primary') {
        elements.statusMessage.textContent = message;
        elements.statusMessage.style.color = colors[type];
    }

    // Initialize
    elements.downloadOptions.style.display = 'none';
    updateStatus('Ready to swap faces', 'primary');
});