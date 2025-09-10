// 画像ファイルのリスト
const imageFiles = [
    '1.jpg', '2.png', '3.jpg', '4.png', '5.png', '6.jpg',
    '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg',
    '13.jpg', '14.png', '15.jpg', '16.jpg', '17.jpg', '18.png',
    '19.jpeg', '20.jpg', '21.jpeg', '22.jpg'
];

// 選択された画像を管理する配列
let selectedImages = [];

// 投票データを管理するオブジェクト
let votingData = {};

// 現在の投票状況
let currentVotes = new Set();

// ローカルストレージから投票データを読み込み
function loadVotingData() {
    const saved = localStorage.getItem('logoVotingData');
    if (saved) {
        votingData = JSON.parse(saved);
    }
}

// 投票データをローカルストレージに保存
function saveVotingData() {
    localStorage.setItem('logoVotingData', JSON.stringify(votingData));
}

// DOM要素の取得
const imageGrid = document.getElementById('imageGrid');
const selectedGrid = document.getElementById('selectedGrid');
const selectedCount = document.getElementById('selectedCount');
const clearSelectionBtn = document.getElementById('clearSelection');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

// 新しい機能のDOM要素
const downloadSelectedBtn = document.getElementById('downloadSelected');
const compareModeBtn = document.getElementById('compareMode');
const exportResultsBtn = document.getElementById('exportResults');
const votingSection = document.getElementById('votingSection');
const votingGrid = document.getElementById('votingGrid');
const submitVoteBtn = document.getElementById('submitVote');
const viewResultsBtn = document.getElementById('viewResults');
const resetVotesBtn = document.getElementById('resetVotes');
const comparisonModal = document.getElementById('comparisonModal');
const comparisonGrid = document.getElementById('comparisonGrid');
const closeComparisonBtn = document.getElementById('closeComparison');

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadVotingData(); // 投票データを読み込み
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
    
    const selectIndicator = document.createElement('div');
    selectIndicator.className = 'select-indicator';
    selectIndicator.textContent = '✓';
    
    imageInfo.appendChild(title);
    imageInfo.appendChild(format);
    imageItem.appendChild(img);
    imageItem.appendChild(imageInfo);
    imageItem.appendChild(selectIndicator);
    
    // クリックイベント
    imageItem.addEventListener('click', function() {
        toggleSelection(filename, index, imageItem);
    });
    
    return imageItem;
}

// 画像の選択/選択解除
function toggleSelection(filename, index, imageItem) {
    const isSelected = selectedImages.some(img => img.filename === filename);
    
    if (isSelected) {
        // 選択解除
        selectedImages = selectedImages.filter(img => img.filename !== filename);
        imageItem.classList.remove('selected');
    } else {
        // 選択
        selectedImages.push({
            filename: filename,
            index: index,
            element: imageItem
        });
        imageItem.classList.add('selected');
    }
    
    updateSelectedDisplay();
    updateSelectedCount();
}

// 選択された画像の表示を更新
function updateSelectedDisplay() {
    selectedGrid.innerHTML = '';
    
    if (selectedImages.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = '選択されたロゴがありません';
        selectedGrid.appendChild(emptyState);
        return;
    }
    
    selectedImages.forEach((selectedImage, selectedIndex) => {
        const selectedItem = document.createElement('div');
        selectedItem.className = 'selected-item';
        
        const img = document.createElement('img');
        img.src = selectedImage.filename;
        img.alt = `選択されたロゴ ${selectedIndex + 1}`;
        
        const title = document.createElement('h4');
        title.textContent = `ロゴ ${selectedImage.index + 1}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '削除';
        removeBtn.className = 'remove-btn';
        removeBtn.style.cssText = `
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 0.8rem;
            margin-top: 5px;
        `;
        
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeFromSelection(selectedImage.filename);
        });
        
        selectedItem.appendChild(img);
        selectedItem.appendChild(title);
        selectedItem.appendChild(removeBtn);
        selectedGrid.appendChild(selectedItem);
    });
}

// 選択から削除
function removeFromSelection(filename) {
    const imageItem = document.querySelector(`[data-filename="${filename}"]`);
    if (imageItem) {
        imageItem.classList.remove('selected');
    }
    
    selectedImages = selectedImages.filter(img => img.filename !== filename);
    updateSelectedDisplay();
    updateSelectedCount();
}

// 選択数の更新
function updateSelectedCount() {
    selectedCount.textContent = `選択済み: ${selectedImages.length}件`;
}

// イベントリスナーの設定
function setupEventListeners() {
    // 選択クリアボタン
    clearSelectionBtn.addEventListener('click', function() {
        selectedImages.forEach(selectedImage => {
            const imageItem = document.querySelector(`[data-filename="${selectedImage.filename}"]`);
            if (imageItem) {
                imageItem.classList.remove('selected');
            }
        });
        selectedImages = [];
        updateSelectedDisplay();
        updateSelectedCount();
        hideVotingSection();
    });
    
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
    
    // 新しい機能のイベントリスナー
    downloadSelectedBtn.addEventListener('click', downloadSelectedImages);
    compareModeBtn.addEventListener('click', openComparisonModal);
    exportResultsBtn.addEventListener('click', exportResults);
    submitVoteBtn.addEventListener('click', submitVote);
    viewResultsBtn.addEventListener('click', viewVotingResults);
    resetVotesBtn.addEventListener('click', resetVotingData);
    closeComparisonBtn.addEventListener('click', closeComparisonModal);
    
    // モーダルの背景クリックで閉じる
    comparisonModal.addEventListener('click', function(e) {
        if (e.target === comparisonModal) {
            closeComparisonModal();
        }
    });
    
    // キーボードショートカット
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (comparisonModal.classList.contains('active')) {
                closeComparisonModal();
            } else {
                clearSelectionBtn.click();
            }
        }
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

// 画像の拡大表示機能（オプション）
function showImageModal(filename) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
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
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

// ダブルクリックで画像を拡大表示
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const imageItems = document.querySelectorAll('.image-item');
        imageItems.forEach(item => {
            item.addEventListener('dblclick', function() {
                const filename = this.dataset.filename;
                showImageModal(filename);
            });
        });
    }, 100);
});

// 選択された画像をダウンロード
function downloadSelectedImages() {
    if (selectedImages.length === 0) {
        alert('ダウンロードする画像を選択してください。');
        return;
    }
    
    selectedImages.forEach((selectedImage, index) => {
        const link = document.createElement('a');
        link.href = selectedImage.filename;
        link.download = `logo_${selectedImage.index + 1}_${selectedImage.filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // ZIPファイルとしてダウンロード（簡易版）
    setTimeout(() => {
        alert(`${selectedImages.length}個の画像をダウンロードしました。`);
    }, 500);
}

// 比較モーダルを開く
function openComparisonModal() {
    if (selectedImages.length === 0) {
        alert('比較する画像を選択してください。');
        return;
    }
    
    comparisonGrid.innerHTML = '';
    
    selectedImages.forEach(selectedImage => {
        const comparisonItem = document.createElement('div');
        comparisonItem.className = 'comparison-item';
        
        const img = document.createElement('img');
        img.src = selectedImage.filename;
        img.alt = `ロゴ ${selectedImage.index + 1}`;
        
        const title = document.createElement('h4');
        title.textContent = `ロゴ ${selectedImage.index + 1}`;
        
        const format = document.createElement('p');
        format.textContent = `形式: ${selectedImage.filename.split('.').pop().toUpperCase()}`;
        
        comparisonItem.appendChild(img);
        comparisonItem.appendChild(title);
        comparisonItem.appendChild(format);
        comparisonGrid.appendChild(comparisonItem);
    });
    
    comparisonModal.classList.add('active');
}

// 比較モーダルを閉じる
function closeComparisonModal() {
    comparisonModal.classList.remove('active');
}

// 結果をエクスポート
function exportResults() {
    if (selectedImages.length === 0) {
        alert('エクスポートする画像を選択してください。');
        return;
    }
    
    const results = {
        timestamp: new Date().toISOString(),
        selectedImages: selectedImages.map(img => ({
            filename: img.filename,
            index: img.index + 1
        })),
        totalCount: selectedImages.length
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `logo_selection_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('選択結果をエクスポートしました。');
}

// 投票セクションを表示
function showVotingSection() {
    if (selectedImages.length === 0) {
        return;
    }
    
    votingGrid.innerHTML = '';
    
    selectedImages.forEach(selectedImage => {
        const votingItem = document.createElement('div');
        votingItem.className = 'voting-item';
        votingItem.dataset.filename = selectedImage.filename;
        
        const img = document.createElement('img');
        img.src = selectedImage.filename;
        img.alt = `ロゴ ${selectedImage.index + 1}`;
        
        const title = document.createElement('h4');
        title.textContent = `ロゴ ${selectedImage.index + 1}`;
        
        const voteCount = document.createElement('div');
        voteCount.className = 'vote-count';
        voteCount.textContent = `投票数: ${votingData[selectedImage.filename] || 0}`;
        
        votingItem.appendChild(img);
        votingItem.appendChild(title);
        votingItem.appendChild(voteCount);
        
        votingItem.addEventListener('click', function() {
            toggleVote(selectedImage.filename, votingItem);
        });
        
        votingGrid.appendChild(votingItem);
    });
    
    votingSection.classList.add('active');
}

// 投票セクションを非表示
function hideVotingSection() {
    votingSection.classList.remove('active');
    currentVotes.clear();
}

// 投票の切り替え
function toggleVote(filename, votingItem) {
    if (currentVotes.has(filename)) {
        currentVotes.delete(filename);
        votingItem.classList.remove('voted');
    } else {
        currentVotes.add(filename);
        votingItem.classList.add('voted');
    }
}

// 投票を送信
function submitVote() {
    if (currentVotes.size === 0) {
        alert('投票するロゴを選択してください。');
        return;
    }
    
    const voteCount = currentVotes.size;
    
    currentVotes.forEach(filename => {
        votingData[filename] = (votingData[filename] || 0) + 1;
    });
    
    // 投票データをローカルストレージに保存
    saveVotingData();
    
    // 投票数を更新
    selectedImages.forEach(selectedImage => {
        const voteCountElement = document.querySelector(`[data-filename="${selectedImage.filename}"] .vote-count`);
        if (voteCountElement) {
            voteCountElement.textContent = `投票数: ${votingData[selectedImage.filename] || 0}`;
        }
    });
    
    // 投票済みの表示をクリア
    const votedItems = document.querySelectorAll('.voting-item.voted');
    votedItems.forEach(item => {
        item.classList.remove('voted');
    });
    
    currentVotes.clear();
    
    // 成功メッセージ
    alert(`${voteCount}件の投票を送信しました。\n\n投票結果は「投票結果を見る」ボタンで確認できます。`);
    
    // 投票結果を自動表示（オプション）
    setTimeout(() => {
        if (confirm('投票結果を今すぐ確認しますか？')) {
            viewVotingResults();
        }
    }, 1000);
}

// 投票結果を表示
function viewVotingResults() {
    if (Object.keys(votingData).length === 0) {
        alert('まだ投票がありません。');
        return;
    }
    
    const results = Object.entries(votingData)
        .sort(([,a], [,b]) => b - a)
        .map(([filename, votes], rank) => {
            const index = imageFiles.indexOf(filename) + 1;
            const medal = rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : '  ';
            return `${medal} ${rank + 1}位: ロゴ ${index} (${votes}票)`;
        });
    
    const totalVotes = Object.values(votingData).reduce((sum, votes) => sum + votes, 0);
    const resultText = `📊 投票結果 (総投票数: ${totalVotes}票)\n\n${results.join('\n')}`;
    
    alert(resultText);
}

// 投票データをリセット
function resetVotingData() {
    if (Object.keys(votingData).length === 0) {
        alert('リセットする投票データがありません。');
        return;
    }
    
    if (confirm('すべての投票データをリセットしますか？\nこの操作は取り消せません。')) {
        votingData = {};
        currentVotes.clear();
        localStorage.removeItem('logoVotingData');
        
        // 投票数の表示を更新
        selectedImages.forEach(selectedImage => {
            const voteCountElement = document.querySelector(`[data-filename="${selectedImage.filename}"] .vote-count`);
            if (voteCountElement) {
                voteCountElement.textContent = '投票数: 0';
            }
        });
        
        // 投票済みの表示をクリア
        const votedItems = document.querySelectorAll('.voting-item.voted');
        votedItems.forEach(item => {
            item.classList.remove('voted');
        });
        
        alert('投票データをリセットしました。');
    }
}

// 選択された画像の表示を更新（投票セクションも含む）
function updateSelectedDisplay() {
    selectedGrid.innerHTML = '';
    
    if (selectedImages.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = '選択されたロゴがありません';
        selectedGrid.appendChild(emptyState);
        hideVotingSection();
        return;
    }
    
    selectedImages.forEach((selectedImage, selectedIndex) => {
        const selectedItem = document.createElement('div');
        selectedItem.className = 'selected-item';
        
        const img = document.createElement('img');
        img.src = selectedImage.filename;
        img.alt = `選択されたロゴ ${selectedIndex + 1}`;
        
        const title = document.createElement('h4');
        title.textContent = `ロゴ ${selectedImage.index + 1}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '削除';
        removeBtn.className = 'remove-btn';
        removeBtn.style.cssText = `
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 0.8rem;
            margin-top: 5px;
        `;
        
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeFromSelection(selectedImage.filename);
        });
        
        selectedItem.appendChild(img);
        selectedItem.appendChild(title);
        selectedItem.appendChild(removeBtn);
        selectedGrid.appendChild(selectedItem);
    });
    
    // 投票セクションを表示
    showVotingSection();
}
