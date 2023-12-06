# Garage Sale - Local Network Service for All communities

## 構成

以下は、データを表にしたものです。

| 項目                         | 内容       |
| ---------------------------- | ---------- |
| 言語                         | TypeScript |
| フロントエンドフレームワーク | SvelteKit  |
| データベース                 | SQLite     |
| ORM                          | Prisma     |
| Mocking                      | MSW        |

## セットアップ概要

以下は、小規模アプリケーションのセットアップ手順です。[perplexity](https://www.perplexity.ai/search/web-selfhosted-svelte-LOvI9YjHSkKmNhHQYUnF_g?s=c)の回答をもとに編集しました。

### Node.js のインストール

Node.js のバージョン `20.9.x` を準備してください。

### TypeScript のインストール

まず、TypeScript をインストールします。以下のコマンドを実行してください。

```bash
npm install -g typescript
```

### SvelteKit のインストール

次に、SvelteKit をインストールします。以下のコマンドを実行してください。

```bash
npx degit sveltejs/kit my-app
cd my-app
npm install
```

### SQLite のインストール

SQLite をインストールします。以下のコマンドを実行してください。

```bash
npm install sqlite3
```

### Prisma のインストール

Prisma をインストールします。以下のコマンドを実行してください。

```bash
npm install prisma
```

### Prisma の設定ファイルを作成する

まず、Prisma の設定ファイルを作成します。例えば、`prisma/schema.prisma`ファイルを作成し、以下のように記述します。

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
}
```

### Prisma Client を生成する

次に、Prisma Client を生成します。以下のコマンドを実行してください。

```bash
npx prisma generate
```

### バックエンドの実装

バックエンドを実装します。以下の手順を実行してください。

- `src/routes/api/db.js`ファイルを作成し、以下のように記述します。

  ```javascript
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  module.exports = prisma;
  ```

- `src/routes/api/users.js`ファイルを作成し、以下のように記述します。

  ```javascript
  import prisma from './db.js';

  export async function get(request) {
  	const users = await prisma.user.findMany();
  	return {
  		body: users
  	};
  }

  export async function post(request) {
  	const { email, name } = request.body;
  	await prisma.user.create({
  		data: {
  			email,
  			name
  		}
  	});
  	return {
  		status: 201
  	};
  }
  ```

### フロントエンドの実装

フロントエンドを実装します。以下の手順を実行してください。

- `src/routes/index.svelte`ファイルを作成し、以下のように記述します。

  ```html
  <script>
  	import { onMount } from 'svelte';
  	import { get, post } from '../api/users.js';

  	let users = [];

  	async function loadUsers() {
  		const response = await get();
  		users = await response.json();
  	}

  	async function addUser() {
  		const email = prompt('Enter email');
  		const name = prompt('Enter name');
  		await post({ email, name });
  		await loadUsers();
  	}

  	onMount(loadUsers);
  </script>

  <ul>
  	{#each users as user}
  	<li>{user.email} ({user.name})</li>
  	{/each}
  </ul>

  <button on:click="{addUser}">Add User</button>
  ```

以上の手順により、小規模アプリケーションのセットアップが完了します。Prisma を使用して SQLite データベースを操作し、SvelteKit を使用してフロントエンドを実装することができます。

Citations:
[1] <https://www.prisma.io/blog/sveltekit-prisma-kvCOEoeQlC>
[2] <https://reffect.co.jp/node-js/prisma-basic>
[3] <https://kakehashi-dev.hatenablog.com/entry/2022/03/07/100000>
[4] <https://zenn.dev/fuka225/articles/74beaac10536c2>
[5] <https://hartenfeller.dev/blog/sveltekit-offline-sqlite-1>
[6] <https://hartenfeller.dev/blog/sveltekit-with-sqlite>
