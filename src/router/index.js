const routes = [
  {
    path: "/",
    redirect: "/product",
  },
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "/",
        redirect: "/product",
      },
      {
        path: "/product",
        name: "Product",
        meta: {
          name: "ๅๅๅ่กจ",
        },
        component: () => import("../views/product/index.vue"),
      },
    ],
  },
];

export default routes;
