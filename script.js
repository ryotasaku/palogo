// 画像ファイルのリスト
const imageFiles = [
    '1.jpg', '2.png', '3.jpg', '4.png', '5.png', '6.jpg',
    '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg',
    '13.jpg', '14.png', '15.jpg', '16.jpg', '17.jpg', '18.png',
    '19.jpeg', '20.jpg', '21.jpeg', '22.jpg', '23.png', '24.jpg', '25.jpg',
    '26.jpg', '27.png', '28.png', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.png',
    '36.png', '37.jpg', '38.jpg', '39.jpg', '40.jpg', '41.jpg', '42.png'
];

// 画像拡大表示用のモーダル管理
let currentModal = null;

// 画像拡大表示機能
function showImageModal(filename) {
    // 既存のモーダルがあれば削除
    if (currentModal) {
        document.body.removeChild(currentModal);
    }
    
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = filename;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        z-index: 1001;
    `;
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    currentModal = modal;
    
    // クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === closeBtn) {
            closeImageModal();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

// 画像モーダルを閉じる
function closeImageModal() {
    if (currentModal) {
        document.body.removeChild(currentModal);
        currentModal = null;
    }
}

// DOM要素の取得
const imageGrid = document.getElementById('imageGrid');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    setupEventListeners();
});

// 画像を読み込んで表示
function loadImages() {
    imageGrid.innerHTML = '';
    
    imageFiles.forEach((filename, index) => {
        const imageItem = createImageItem(filename, index);
        imageGrid.appendChild(imageItem);
    });
}

// 画像アイテムを作成
function createImageItem(filename, index) {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.dataset.filename = filename;
    imageItem.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = filename;
    img.alt = `ロゴ ${index + 1}`;
    img.loading = 'lazy';
    
    const imageInfo = document.createElement('div');
    imageInfo.className = 'image-info';
    
    const title = document.createElement('h3');
    title.textContent = `ロゴ ${index + 1}`;
    
    const format = document.createElement('p');
    format.textContent = `形式: ${filename.split('.').pop().toUpperCase()}`;
    
    imageInfo.appendChild(title);
    imageInfo.appendChild(format);
    imageItem.appendChild(img);
    imageItem.appendChild(imageInfo);
    
    // クリックイベント - 画像拡大表示
    imageItem.addEventListener('click', function() {
        showImageModal(filename);
    });
    
    return imageItem;
}



// イベントリスナーの設定
function setupEventListeners() {
    // 表示モード切り替え
    gridViewBtn.addEventListener('click', function() {
        imageGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', function() {
        imageGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}

// 画像の読み込みエラーハンドリング
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                height: 200px;
                background: #f8f9fa;
                color: #666;
                font-style: italic;
            `;
            errorDiv.textContent = '画像を読み込めませんでした';
            parent.replaceChild(errorDiv, this);
        });
    });
});



