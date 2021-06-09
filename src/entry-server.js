import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    console.log('context', context.url, context)
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      console.log(matchedComponents)

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({ store })
        }
      })).then(() => {
        // 如果设置了template选项，那么会把context.state的值作为window.__INITIAL_STATE__自动插入到模板html中
        context.state = store.state;
        // 返回根组件
        resolve(app);
      })
    }, reject)
  })
}