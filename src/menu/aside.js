// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '产品分类',
    icon: 'archive',
    children: [
      { path: '/prolist', title: '产品列表' },
      { title: '产品审核',
        children: [
          { path: '/proclassyes', title: '已分类' },
          { path: '/proclassno', title: '未分类' }
        ]
      },
      { path: '/page2', title: '分类列表' },
      { path: '/rule', title: '分类规则' }
    ]
  },
  {
    title: '标准',
    icon: 'list-alt',
    children: [
      { path: '/page3', title: '标准列表' }
    ]
  },
  {
    title: '数据管理',
    icon: 'list-alt',
    children: [
      { path: '/upload', title: '上传数据' },
      { path: '/update', title: '更新分类' }
    ]
  }
]
