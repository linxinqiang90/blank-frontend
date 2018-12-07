import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/home/git/blank-frontend/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/home/git/blank-frontend/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/home/git/blank-frontend/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/home/git/blank-frontend/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('/home/git/blank-frontend/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/home/git/blank-frontend/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/home/git/blank-frontend/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('/home/git/blank-frontend/src/pages/User/models/register.js').default) });
app.model({ namespace: 'activities', ...(require('/home/git/blank-frontend/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'monitor', ...(require('/home/git/blank-frontend/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'geographic', ...(require('/home/git/blank-frontend/src/pages/Account/Settings/models/geographic.js').default) });
