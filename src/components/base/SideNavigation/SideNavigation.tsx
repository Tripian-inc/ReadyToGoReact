/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Model from '@tripian/model';
import CloseIconButton from '../Button/Icons/CloseIconButton/CloseIconButton';
import Feedback from '../../FeedBack/FeedBack';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import classes from './SideNavigation.scss';

enum MENUITEMS {
  TRIPS = 'TRIPS',
  USER = 'USER',
  SUPPORT = 'SUPPORT',
}

interface ISideNavigationMenuItem {
  header: string;
  title: string;
  onClick: () => void;
  hide?: boolean;
}

interface ISideNavigation {
  title: string;
  menuItems: ISideNavigationMenuItem[];
  open?: boolean;
  closed: () => void;
  showBbButton?: boolean;
  feedbackSubjects: Model.FeedbackSubjects[];
  loadingFeedback: boolean;
  sendFeedback: (value: Model.FeedbackRequest) => Promise<void>;
  themeSwitchChecked: boolean;
  themeSwitchCheckedOnchange: (checked: boolean) => void;
  showThemeSwitch: boolean;
  showFeedbackModal: boolean;
  setShowFeedbackModal: (show: boolean) => void;
  // showGoogleTranslate: boolean;
  languageOptions?: Model.LangCode[];
  selectedLanguage: string;
  onSelectedLanguage: (value: string) => void;
  t: (value: Model.TranslationKey) => string;
}

const SideNavigation: React.FC<ISideNavigation> = ({
  title,
  menuItems,
  closed,
  open = false,
  showBbButton = false,
  feedbackSubjects,
  loadingFeedback,
  sendFeedback,
  themeSwitchChecked,
  themeSwitchCheckedOnchange,
  showThemeSwitch,
  showFeedbackModal,
  setShowFeedbackModal,
  // showGoogleTranslate,
  languageOptions,
  selectedLanguage,
  onSelectedLanguage,
  t,
}) => {
  // const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

  const overlayClicked = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    closed();
  };

  const sidenavOverlayClasses = [classes.sidenavOverlay];
  const sidenavClasses = [classes.sidenav];
  if (open) {
    sidenavOverlayClasses.push(classes.sidenavOverlayOpen);
    sidenavClasses.push(classes.sidenavOpen);
  }

  const extraMenuItemsFiltered = menuItems.filter((menuItem) => !menuItem.hide && menuItem.header !== MENUITEMS.TRIPS && menuItem.header !== MENUITEMS.USER && menuItem.header !== MENUITEMS.SUPPORT);
  const extraMenuItems = extraMenuItemsFiltered.reduce((prev: Record<string, ISideNavigationMenuItem[]>, cur: ISideNavigationMenuItem) => {
    const newRecord = { ...prev };
    newRecord[cur.header] = newRecord[cur.header] || [];
    newRecord[cur.header].push(cur);
    return newRecord;
  }, {});

  return (
    <>
      <div className={sidenavOverlayClasses.join(' ')} onClick={overlayClicked} onKeyPress={() => {}} role="button" tabIndex={0}>
        {' '}
      </div>
      <div className={sidenavClasses.join(' ')}>
        <div className={classes.image}>
          {title !== ' ' ? <span className={classes.title}>{`${t('user.hi')}, ${title}`}</span> : null}

          <div className={classes.close}>
            <CloseIconButton
              fill="#fff"
              clicked={() => {
                closed();
              }}
            />
          </div>
          {showThemeSwitch && (
            <div className={classes.themeToggle}>
              <ToggleSwitch checked={themeSwitchChecked} optionLabels={[t('theme.dark'), t('theme.light')]} onChange={() => themeSwitchCheckedOnchange(themeSwitchChecked)} />
            </div>
          )}
        </div>
        {/* {showGoogleTranslate && <div className={classes.googleTranslate} id="google_translate_element" />} */}

        {languageOptions && languageOptions.length > 0 && (
          <div className={classes.languageSelect}>
            <select value={selectedLanguage} onChange={(e) => onSelectedLanguage(e.target.value)}>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <ul className={`${classes.sidenavList} ${showBbButton ? classes.sideNavCustomHeight : ''}`}>
          {menuItems.some((menuItem) => !menuItem.hide && menuItem.header === MENUITEMS.TRIPS) && (
            <li>
              <h3 className="m4">{t('trips.title').toUpperCase()}</h3>
            </li>
          )}
          {menuItems
            .filter((menuItem) => !menuItem.hide && menuItem.header === MENUITEMS.TRIPS)
            .map((menuItem) => (
              <li key={menuItem.title}>
                <button
                  className={classes.button}
                  key={menuItem.title}
                  type="button"
                  onClick={() => {
                    closed();
                    menuItem.onClick();
                  }}
                >
                  {menuItem.title}
                </button>
              </li>
            ))}

          {Object.entries(extraMenuItems).map((record) => {
            const header = record[0];
            const items = record[1];

            return (
              <React.Fragment key={`header_${header}`}>
                <li>
                  <h3 className="m4">{header}</h3>
                </li>
                {items.map((menuItem) => (
                  <li key={menuItem.title}>
                    <button
                      className={classes.button}
                      key={menuItem.title}
                      type="button"
                      onClick={() => {
                        closed();
                        menuItem.onClick();
                      }}
                    >
                      {menuItem.title}
                    </button>
                  </li>
                ))}
              </React.Fragment>
            );
          })}

          <li>
            <h3 className="m4">{t('user.title').toUpperCase()}</h3>
          </li>
          {menuItems
            .filter((menuItem) => !menuItem.hide && menuItem.header === MENUITEMS.USER)
            .map((menuItem) => (
              <li key={menuItem.title}>
                <button
                  className={classes.button}
                  key={menuItem.title}
                  type="button"
                  onClick={() => {
                    closed();
                    menuItem.onClick();
                  }}
                >
                  {menuItem.title}
                </button>
              </li>
            ))}
          <li>
            <h3 className="m4">{t('support.title').toUpperCase()}</h3>
          </li>
          {/* <li>
            <div className={classes.links}>
              <a target="_blank" href="https://tripian.zendesk.com/hc/en-us">
                Help Desk
              </a>
            </div>
          </li>
          <li>
            <div className={classes.links}>
              <a target="_blank" href="https://tripian.zendesk.com/hc/en-us/requests/new">
                Contact Support
              </a>
            </div>
          </li> */}

          {menuItems
            .filter((menuItem) => !menuItem.hide && menuItem.header === MENUITEMS.SUPPORT)
            .map((menuItem) => (
              <li key={menuItem.title}>
                <button
                  className={classes.button}
                  key={menuItem.title}
                  type="button"
                  onClick={() => {
                    // if (menuItem.title === 'Feedback') setShowFeedbackModal(true);
                    closed();
                    menuItem.onClick();
                  }}
                >
                  {menuItem.title}
                </button>
              </li>
            ))}
        </ul>

        {showBbButton && (
          <a className={classes.bbHomeLink} href="https://bookbarbados.com/" target="_blank">
            <div className={classes.bbHomeLinkImg} />
          </a>
        )}
      </div>
      {!loadingFeedback && <Feedback feedbackSubjects={feedbackSubjects} sendFeedback={sendFeedback} showModal={showFeedbackModal} setShowModal={() => setShowFeedbackModal(!showFeedbackModal)} t={t} />}
    </>
  );
};

export default SideNavigation;
