# 社内共有ガイド

## 🌐 共有方法の選択肢

### 1. GitHub Pages（推奨・無料）

**メリット:**
- 完全無料
- 簡単にセットアップ
- 自動更新
- 社内全員がアクセス可能

**手順:**
1. GitHubアカウントを作成
2. 新しいリポジトリを作成（例：`company-logo-selection`）
3. ファイルをアップロード
4. Settings > Pages でGitHub Pagesを有効化
5. 生成されたURLを社内に共有

**URL例:** `https://yourusername.github.io/company-logo-selection/`

### 2. Netlify（推奨・無料）

**メリット:**
- ドラッグ&ドロップでデプロイ
- カスタムドメイン対応
- 自動HTTPS

**手順:**
1. [netlify.com](https://netlify.com) にアクセス
2. ファイルをドラッグ&ドロップ
3. 生成されたURLを社内に共有

### 3. Vercel（推奨・無料）

**メリット:**
- 高速デプロイ
- 自動HTTPS
- カスタムドメイン対応

**手順:**
1. [vercel.com](https://vercel.com) にアクセス
2. GitHubと連携してデプロイ
3. 生成されたURLを社内に共有

### 4. 社内サーバー

**メリット:**
- 社内ネットワーク内でのみアクセス
- セキュリティが高い

**手順:**
1. 社内サーバーにファイルをアップロード
2. Webサーバーで公開
3. 社内IPアドレスでアクセス

### 5. Google Drive / OneDrive

**メリット:**
- 既存の社内アカウントで利用可能
- 簡単に共有

**手順:**
1. ファイルをクラウドストレージにアップロード
2. 共有リンクを生成
3. 社内メンバーに共有

## 📋 推奨手順（GitHub Pages）

### Step 1: GitHubリポジトリの作成
```bash
# 既にGitリポジトリは初期化済み
git remote add origin https://github.com/yourusername/company-logo-selection.git
git push -u origin main
```

### Step 2: GitHub Pagesの有効化
1. GitHubリポジトリの「Settings」タブをクリック
2. 左サイドバーの「Pages」をクリック
3. Source を「Deploy from a branch」に設定
4. Branch を「main」に設定
5. 「Save」をクリック

### Step 3: 社内共有
- 生成されたURL（例：`https://yourusername.github.io/company-logo-selection/`）を社内に共有
- 全員が同じURLでアクセス可能

## 🔧 カスタマイズオプション

### カスタムドメイン
- 独自ドメインを設定可能
- 例：`logo.yourcompany.com`

### 認証機能の追加
- 社内メンバーのみアクセス可能にする
- パスワード保護機能

### 投票結果のエクスポート
- CSV形式で投票結果をダウンロード
- 会議資料に活用

## 📱 モバイル対応

- スマートフォン・タブレットでも利用可能
- レスポンシブデザイン対応済み

## 🔒 セキュリティ考慮事項

- 画像ファイルは公開される
- 機密性の高いロゴの場合は社内サーバーを推奨
- 必要に応じて認証機能を追加

## 📞 サポート

技術的な問題が発生した場合は、IT部門にご相談ください。
