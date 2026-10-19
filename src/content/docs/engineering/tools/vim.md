---
title: Vim & Neovim
description: 通过 vimtutor、实践与帮助文档学习 Vim。
---

很多时候我们需要 ssh 一下 Linux 服务器来完成一些任务，但这些服务器基本上不会预装 IDE，比如说 VSCode、PyCharm。

最快捷的办法就是使用系统自带的编辑器，其中最出名的必然是 Vim。

## 怎么学 Vim？

主要看 vimtutor 就好。在终端输入 `vimtutor`，就会用 vim 打开一个文档教程，跟着里面的教学手敲就好了。（如果打开的不是中文，可以试试 `vimtutor zh`，不过有些系统没装中文教程文件，没装的话就还是英文版）

vimtutor 敲完，直接强迫自己用一段时间 Vim，过段时间就会发现自己越用越顺手；如果忘记什么命令直接 `:help` 查一下，或者再翻一下 `vimtutor` 就好。

Vim 相关书籍推荐《Practical Vim》。

## 更现代的选择——Neovim

Vim 这个编辑器历史已经相当悠久了，默认配置和插件生态相对老旧，而且 Vim 为了兼容很多古早设备，还维护了相当冗余的代码。因此社区 fork 出了 Neovim，删掉冗余代码，配置语言换成 Lua，显得更加现代。因此对于喜欢 Vim 甚至打算直接把 Vim 作为主力的人，我更推荐使用 Neovim。

Neovim 默认不带太多开箱即用的功能，通常需要自己写配置，或者套用现成的配置。自己从零搭相当不友好，因此社区比较推荐从带注释的基础配置模板开始，最出名的是 [Kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim)。如果想开箱即用，那就无脑入 [LazyVim](https://www.lazyvim.org/)，它是社区里很流行、口碑不错的一套配置，集成了大量插件，开箱即用程度在 Neovim 配置里算很高的。
