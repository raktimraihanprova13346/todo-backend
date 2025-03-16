#### Operation Verification Steps

1. **Environment Setup**
    - Install Node.js (v16 or higher).
    - Run `npm install` in both `todo-frontend/todo-frontend` and `/todo-backend` directories.
    - Configure `src/app.module.ts` file in the `/todo-backend` folder:
      ```
      DB_HOST=localhost
      DB_USER=username
      DB_PASSWORD=password
      ```

2. **Running the Application**
    - Start the backend with `npm start` from the `backend` folder.
    - Start the frontend with `npm start` from the `frontend` folder.
    - Open `http://localhost:3000` in the browser.
    - Backend is configured to run on `http://localhost:3001`

### Login and Logout

1. **User Registration**
    - Site is only accessible to registered user. So, if the user is not registered, user will be redirected to the **Sign In** page.
    -  For Sign up click on sign-up to navigate to `/signup`.
    - Create a new user with:
        - Username: `Test User`
        - Email: `test@example.com`
        - Password: `Test1234!`
    - Verify user is saved in the database under the `users` table.

2. **Login Functionality**
    - After sign-up, user will be redirected to **sign in** page.
    - Use the email `test@example.com` and password `Test1234!` to log in.
    - Verify a user session is maintained for 24 hours.
    - User will be redirected to the **todo-list** `/todo-list` page.
    - User is verified using JWT token. Token is stored as cookies with validity 24 hours.

3. **Logout Functionality**
    - From the left menu, click logout.
    - On logging out, user will be redirected to the **sign-in** page.
    - Cookies will be removed from the browser.

### Tag Operations

1. **Add Tag**
    - From left menu, click **Add Tag** to add tag.
    - From the input, enter the tag name. Tag should have a minimum three characters.
    - After tag insertion, user will be redirected to the tag-list page. Here, user can see all the registered tags.
    - Registered tags are displayed based on update time of tag data.
    - Verify that the filtered results are accurate.

2. **Edit Tag**
    - From the tag-list page, user can update the content of the tag.
    - To update the content. click on the tag-name. The field will be transformed to an input field.
    - User can modify the tag data by inserting the new valid data.
3. **Delete Tag**
    - To Delete tag, click on the cross-icon beside the tag name.

### Todo Operations

1. **Add Todo**
    - From the left menu, click **Add Todo** to create a new todo.
    - From the input fields, enter the required details for the todo The title should have a minimum of five characters.
    - Choose application deadline from the date picker. Adding deadline is optional.
    - Select Tags to be added with this Todo from **Tags(comma-separated):**
    - After the todo is successfully added, the user will be redirected to the todo-list page, where all added todos can be viewed.
    - Todos are displayed based on their deadline.
    - Verify that the filtered todos are displayed accurately.

2. **Edit Todo**
    - From the todo-list page, the user can update the content of a todo item.
    - To edit a todo, click on the todo title or todo-content (if available). The field will be transformed into an input field.
    - To add new DeadLine, click on the deadline text. The field will be transformed into an input field, and user will be prompted to select a new date.
    - To add or remove tag, click on the tag section. Dropdown selection will appear to make choice. User can add or remove existing tags.
    - Change the Complete or Incomplete status from the dropdown.
    - Modify the todo content by entering the new, valid information. Confirm the changes to save.

3. **Delete Todo**
    - To delete a todo, click on the delete button.
    - Confirm the deletion if a confirmation dialog appears. Once deleted, the todo will no longer appear in the list.


### Others

1. **General Check**
    - Create, edit, and delete TODO and Tag items.
    - Verify that:
        - Created items appear in the list.
        - Edited items reflect updates in the UI and database.
        - Deleted items are removed from both the UI and database.

2. **Pagination**
    - Add more than 10 TODO items and 15 tag items.
    - Pagination is added on both **todo-list** and **tag-list** pages.
    - Verify pagination works by navigating through pages.



#### 操作確認手順

1. **環境セットアップ**
    - Node.js（バージョン16以上）をインストールします。
    - `todo-frontend/todo-frontend`および`/todo-backend`ディレクトリで`npm install`を実行します。
    - `/todo-backend`フォルダー内の`src/app.module.ts`ファイルを設定します：
      ```
      DB_HOST=localhost
      DB_USER=username
      DB_PASSWORD=password
      ```

2. **アプリケーションの起動**
    - `backend`フォルダーで`npm start`を使用してバックエンドを起動します。
    - `frontend`フォルダーで`npm start`を使用してフロントエンドを起動します。
    - ブラウザーで`http://localhost:3000`を開きます。
    - バックエンドは`http://localhost:3001`で動作するように設定されています。

### ログインとログアウト

1. **ユーザー登録**
    - サイトは登録済みユーザーのみがアクセスできます。そのため、ユーザーが登録されていない場合、**サインイン**ページにリダイレクトされます。
    - サインアップするには、サインアップをクリックして`/signup`に移動します。
    - 次の情報を使用して新しいユーザーを作成します：
        - ユーザー名：`Test User`
        - メール：`test@example.com`
        - パスワード：`Test1234!`
    - ユーザーが`users`テーブル内のデータベースに保存されていることを確認します。

2. **ログイン機能**
    - サインアップ後、ユーザーは**サインイン**ページにリダイレクトされます。
    - メールアドレス`test@example.com`とパスワード`Test1234!`を使用してログインします。
    - ユーザーセッションが24時間保持されていることを確認します。
    - ユーザーは**Todoリスト** `/todo-list` ページにリダイレクトされます。
    - ユーザーはJWTトークンを使用して検証されます。トークンはCookieに24時間有効な状態で保存されます。

3. **ログアウト機能**
    - 左側のメニューからログアウトをクリックします。
    - ログアウトすると、ユーザーは**サインイン**ページにリダイレクトされます。
    - Cookieはブラウザから削除されます。

### タグの操作

1. **タグを追加**
    - 左側のメニューから**Add Tag**をクリックしてタグを追加します。
    - 入力フィールドからタグ名を入力します。タグ名は最低3文字以上である必要があります。
    - タグを追加した後、ユーザーはタグリストページにリダイレクトされ、登録済みのタグをすべて確認できます。
    - 登録されたタグは、タグデータの更新日時に基づいて表示されます。
    - フィルターされた結果が正確であることを確認してください。

2. **タグを編集**
    - タグリストページからタグの内容を更新できます。
    - 内容を更新するには、タグ名をクリックします。フィールドが入力フィールドに変わります。
    - 新しい有効なデータを入力することでタグデータを更新できます。

3. **タグを削除**
    - タグを削除するには、タグ名の横にあるクロスアイコンをクリックします。

### Todoの操作

1. **Todoを追加**
    - 左側のメニューから**Add Todo**をクリックして新しいTodoを作成します。
    - 入力フィールドから、Todoのタイトルや説明など必要な情報を入力します。タイトルは最低5文字以上である必要があります。
    - 日付ピッカーからアプリケーションの締め切りを選択します。締め切りの追加はオプションです。
    - **Tags(comma-separated):** から、このTodoに追加するタグを選択します。
    - Todoが正常に追加された後、ユーザーはTodoリストページにリダイレクトされ、追加されたTodoをすべて確認できます。
    - Todoは締め切りに基づいて表示されます。
    - フィルターされたTodoが正確に表示されることを確認してください。

2. **Todoを編集**
    - TodoリストページからTodoアイテムの内容を更新できます。
    - Todoを編集するには、TodoタイトルまたはTodoコンテンツ（存在する場合）をクリックします。フィールドが入力フィールドに変わります。
    - 新しい締め切りを追加するには、締め切りテキストをクリックします。フィールドが入力フィールドに変わり、新しい日付を選択するよう求められます。
    - タグを追加または削除するには、タグセクションをクリックします。ドロップダウンセレクションが表示され、選択できます。既存のタグを追加または削除できます。
    - ドロップダウンから完了または未完了のステータスを変更します。
    - 新しい有効な情報を入力することでTodoの内容を変更し、変更を保存します。

3. **Todoを削除**
    - Todoを削除するには、削除ボタンをクリックします。
    - 確認ダイアログが表示された場合、削除を確認します。一度削除されると、Todoはリストに表示されなくなります。

### その他

1. **全般チェック**
    - TODOおよびタグアイテムの作成、編集、削除を確認します。
    - 以下を確認してください：
        - 作成されたアイテムがリストに表示されること。
        - 編集されたアイテムがUIおよびデータベースに反映されること。
        - 削除されたアイテムがUIおよびデータベースの両方から削除されること。

2. **ページネーション**
    - TODOアイテムを10件以上、タグアイテムを15件以上追加します。
    - **todo-list**および**tag-list**ページにはページネーションが追加されています。
    - ページ間を操作してページネーションが正常に動作することを確認します。