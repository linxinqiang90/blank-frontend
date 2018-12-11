import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 Blank Frontend
  </Fragment>
);

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const {
      route: { routes },
      location,
    } = this.props;
    const { pathname } = location;
    let title = 'Blank Frontend';
    const tRoute = routes.filter(item => item.path && item.path.startsWith(pathname));
    if (tRoute && tRoute[0].name) {
      title = `${tRoute[0].name} - Blank Frontend`;
    }
    return title;
  }

  render() {
    const {
      children,
      location: { pathname },
    } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle(pathname)}>
        <div className={styles.container}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Blank Frontend</span>
                </Link>
              </div>
              <div className={styles.desc}>Blank Frontend</div>
            </div>
            {children}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
