import type { ThemeConfig } from './types'

export const themeConfig: ThemeConfig = {
  // SITE INFO ///////////////////////////////////////////////////////////////////////////////////////////
  site: {
    website: 'https://mrsibe.top', // Site domain
    title: 'MrSibe的博客', // Site title
    author: 'MrSibe', // Author name
    description: '西贝的代码宇宙', // Site description
    language: 'zh-CN' // Default language
  },

  // SOCIAL LINKS ////////////////////////////////////////////////////////////////////////////////////////
  social: {
    github: 'https://github.com/mrsibe',
    x: 'https://x.com/Mr_Sibei',
    rss: true // Show RSS link in footer
  },

  // PROJECTS ////////////////////////////////////////////////////////////////////////////////////////////
  projects: ['MrSibe/KnowNote', 'MrSibe/mira'],

  // FRIEND LINKS ////////////////////////////////////////////////////////////////////////////////////////
  friends: [
    {
      name: '梦辰の小窝',
      url: 'https://mc.mimeng.top',
      description: 'Eagerly Anticipating Our Reunion',
      avatar: '/avatars/9bb7c91140080689.avif'
    },
    {
      name: "Soulter's Blog",
      url: 'https://blog.soulter.top/',
      description: 'The world is your canvas!',
      avatar: '/avatars/27d6eae995c230b3.webp'
    },
    {
      name: 'CAICAIIs.World',
      url: 'https://caicaiis.cc/',
      description: '愚者在月影之中怀抱虚妄',
      avatar: '/avatars/cae73b6551263107.jpg'
    },
    {
      name: 'Frederick',
      url: 'https://frederick2313072.github.io/',
      description: "Welcome to my Alter Ego's site!",
      avatar: '/avatars/8ee4229623834829.png'
    }
  ],

  // GENERAL SETTINGS ////////////////////////////////////////////////////////////////////////////////////
  general: {
    contentWidth: '41.25rem', // Content area width (41.25rem = 660px)
    centeredLayout: true, // Use centered layout (false for left-aligned)
    themeToggle: true, // Show theme toggle button (uses system theme by default)
    postListDottedDivider: true, // Show dotted divider in post list
    footer: true, // Show footer
    fadeAnimation: true // Enable fade animations
  },

  // DATE SETTINGS ///////////////////////////////////////////////////////////////////////////////////////
  date: {
    dateFormat: 'YYYY-MM-DD', // Date format: YYYY-MM-DD, MM-DD-YYYY, DD-MM-YYYY, MONTH DAY YYYY, DAY MONTH YYYY
    dateSeparator: '.', // Date separator: . - / (except for MONTH DAY YYYY and DAY MONTH YYYY)
    dateOnRight: true // Date position in post list (true for right, false for left)
  },

  // POST SETTINGS ///////////////////////////////////////////////////////////////////////////////////////
  post: {
    readingTime: false, // Show reading time in posts
    toc: true, // Show table of contents (when there is enough page width)
    imageViewer: true, // Enable image viewer
    copyCode: true, // Enable copy button in code blocks
    linkCard: true, // Enable link card
    katex: true // Enable KaTeX math rendering
  }
}
