/**
 * path 后台配置的路由名称
 * isFixedTopImage: 顶部图片是否fixed布局
 * evoke 唤起参数
 *  path: app 页面路径
 *  useYyb： 是否使用应用宝
 *  params：app 页面参数
 *  eventPage： 埋点页面
 **/
export default function generateEvokeData() {
  const notEvoke = !!location.search.match(/evoke=0/);
  if (notEvoke || sessionStorage.getItem("evoke")) {
    sessionStorage.setItem("evoke", "0");
    return null;
  }
  const path = location.pathname;
  console.log(
    location.pathname,
    /(\/|\/oneAuction|\/identification)?$/.test(path)
  );

  const routes = {
    [(!!/(\/|\/oneAuction|\/identification)?$/.test(path)).toString()]: {
      path: "wbshareHome",
      evoke: {
        path: "home",
        useYyb: true,
        params: {},
        eventPage: "wbshareHome",
      },
    },
    [(!!/wbshare\/auction\/\d+/.test(path)).toString()]: {
      path: "wbshareAuction",
      evoke: {
        path: "productdetail",
        params: {
          sharecode: Number(
            (location.href.match(/wbshare\/auction\/(\d+)/) || [])[1] || 0
          ),
          modulecode: 2,
        },
        eventPage: "wbshareAuction",
      },
    },
    [(!!/wbshare\/share\/\d+/.test(path)).toString()]: {
      path: "wbshareWatchLibrary",
      evoke: {
        path: "productdetail",
        params: {
          sharecode: Number(
            (location.href.match(/wbshare\/share\/(\d+)/) || [])[1] || 0
          ),
          modulecode: 3,
        },
        eventPage: "wbshareWatchLibrary",
      },
    },
    [(!!/wbshare\/share(\/)?$/.test(path)).toString()]: {
      path: "wbshareHome",
      evoke: {
        path: "home",
        useYyb: true,
        params: {},
        eventPage: "share",
      },
    },
    [(!!/wbshare\/views\/member(\/)?$/.test(path)).toString()]: {
      path: "wbshareHome",
      evoke: {
        path: "home",
        useYyb: true,
        params: {},
        eventPage: "member",
      },
    },
    // 手表行情页
    [(!!/wbshare\/views\/activity\/quotation\/(\d+)/.test(path)).toString()]: {
      path: "quotation",
      evoke: {
        path: "mopenweb",
        useYyb: true,
        params: {
          url: location.href,
        },
        eventPage: "quotation",
      },
    },
    // 回收页
    [(!!/wbshare\/views\/recycle\/guide(\/)?/.test(path)).toString()]: {
      path: "recycle",
      isFixedTopImage: true,
      evoke: {
        path: "mopenweb",
        useYyb: true,
        params: {
          url: location.href,
        },
        eventPage: "recycle",
      },
      download: true,
    },
  };
  console.log(routes);

  return routes.true;
}
