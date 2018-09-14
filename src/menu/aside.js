// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '产品分类',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '产品列表' },
      { path: '/page2', title: '分类列表' },
      { path: '/page3', title: '关键字' }
    ]
  }
]
