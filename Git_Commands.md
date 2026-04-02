# 常用 Git 命令与 GitHub 推送流程

## VS Code 图形化操作指南

### 1. 打开源代码管理
- 点击左侧边栏的源代码管理图标（Git 图标）
- 或使用快捷键：`Ctrl+Shift+G`

### 2. 初始化仓库
- 在 VS Code 中打开项目文件夹
- 点击源代码管理面板中的 "初始化仓库" 按钮

### 3. 暂存修改
- 在 "更改" 部分，点击文件旁边的 `+` 图标暂存单个文件
- 或点击 "暂存所有更改" 按钮暂存所有文件

### 4. 提交修改
- 在消息输入框中输入提交信息
- 点击 "√" 按钮提交修改

### 5. 查看历史记录
- 点击源代码管理面板中的 "更多操作" 按钮（...）
- 选择 "查看历史记录" 查看提交历史

### 6. 分支操作
- 点击源代码管理面板中的分支名称（通常显示为 main）
- 在弹出的分支列表中：
  - 选择现有分支切换
  - 输入新分支名称创建分支

### 7. 推送代码
- 提交后，点击源代码管理面板中的 "推送" 按钮
- 或点击 "更多操作" → "推送"

### 8. 拉取代码
- 点击源代码管理面板中的 "更多操作" → "拉取"

### 9. 克隆仓库
- 在 VS Code 欢迎页面，点击 "克隆存储库"
- 输入 GitHub 仓库 URL，选择本地目录

### 10. 解决冲突
- 当有合并冲突时，VS Code 会在文件中显示冲突标记
- 使用内置的冲突解决器选择接受 "当前更改"、"传入更改" 或 "两者都接受"

## 远程仓库操作（GitHub）

### 1. 添加远程仓库
```bash
git remote add origin https://github.com/yourusername/repository.git
```
- 将本地仓库关联到 GitHub 远程仓库

### 2. 推送代码到 GitHub
```bash
git push -u origin main
# 或指定分支
git push origin branch-name
```
- 第一次推送时使用 `-u` 建立追踪关系

### 3. 拉取远程代码
```bash
git pull origin main
```
- 从远程仓库拉取最新代码

### 4. 克隆远程仓库
```bash
git clone https://github.com/yourusername/repository.git
```
- 从 GitHub 克隆仓库到本地

## 完整工作流程

### 1. 新建项目流程
```bash
# 1. 创建目录并进入
mkdir project
cd project

# 2. 初始化 Git 仓库
git init

# 3. 创建文件并编辑
# ... 编写代码 ...

# 4. 添加到暂存区
git add .

# 5. 提交修改
git commit -m "初始化项目"

# 6. 关联 GitHub 远程仓库
git remote add origin https://github.com/yourusername/project.git

# 7. 推送代码
git push -u origin main
```

### 2. 日常开发流程
```bash
# 1. 拉取最新代码（如果多人协作）
git pull origin main

# 2. 编写代码
# ... 开发中 ...

# 3. 查看修改
git status

# 4. 添加修改
git add .

# 5. 提交修改
git commit -m "功能描述"

# 6. 推送到 GitHub
git push origin main
```

## 分支操作

### 1. 创建分支
```bash
git checkout -b feature-branch
```
- 创建并切换到新分支

### 2. 切换分支
```bash
git checkout main
```
- 切换到指定分支

### 3. 合并分支
```bash
git checkout main
git merge feature-branch
```
- 将 feature-branch 合并到 main 分支

### 4. 推送分支
```bash
git push origin feature-branch
```
- 推送新分支到远程仓库

## 常用问题解决

### 1. 撤销未提交的修改
```bash
git checkout -- .
```
- 撤销工作目录的所有修改

### 2. 撤销已提交的修改
```bash
git reset HEAD~1
```
- 撤销最近一次提交，保留修改

### 3. 强制推送（谨慎使用）
```bash
git push -f origin main
```
- 强制覆盖远程仓库的提交历史

### 4. 查看远程仓库信息
```bash
git remote -v
```
- 查看当前关联的远程仓库地址

## 注意事项

1. **提交信息**：使用清晰、简洁的提交信息，描述本次修改的内容
2. **分支管理**：合理使用分支，如 main 分支保持稳定，feature 分支用于开发新功能
3. **定期推送**：养成定期推送代码到 GitHub 的习惯，避免代码丢失
4. **冲突处理**：多人协作时注意处理合并冲突
5. **.gitignore**：创建 .gitignore 文件，排除不需要版本控制的文件（如编译产物、日志文件等）