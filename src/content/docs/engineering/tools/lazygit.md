---
title: Lazygit
description: Lazygit 终端 Git 可视化工具与常用按键速查。
---

现在写项目基本上离不开 Git 了。然而 Git 自带的 CLI 命令有些过于琐碎，我们需要不停地敲击命令才能知道项目有哪些分支、有哪些 commit 等信息。因此大家都更习惯用图形化界面的 Git 管理工具，比如说 IDEA、VSCode 自带的 Git 工具。

不过我在终端写代码时（用 Claude Code、Vim 简单编辑），再专门打开 IDE 使用 Git 工具实在麻烦。[Lazygit](https://github.com/jesseduffield/lazygit) 正好填补了这个空缺——一个纯终端的 Git 可视化工具。

它的界面类似 GitHub Desktop 的布局，左侧是功能面板，右侧是详细信息区。用数字键 1-5 快速切换面板，用空格键执行核心操作。

## 常用按键速查

| 操作                | 按键       |
| ------------------- | ---------- |
| 暂存/取消暂存       | `空格`     |
| 提交                | `c`        |
| 追加提交（Amend）   | `A`        |
| 推送 / 拉取         | `P` / `p`  |
| 切换分支            | `空格`     |
| 新建分支            | `n`        |
| 交互式 Rebase       | `i`        |
| 撤销上一步 Git 操作 | `z`        |
| 查看帮助            | `x` 或 `?` |
