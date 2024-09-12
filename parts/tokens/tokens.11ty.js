import fs from "fs/promises";
import { json } from "stream/consumers";

const variables = (jsonTokens) => ` /* CSS Variables */
:root { 
  /* layout variables */
  --columns-gap: ${ jsonTokens.layout.columns_gap }; 
  --desktop-max-width: ${ jsonTokens.layout.desktop_max_width }; 
  --mobile-breakpoint-width: ${ jsonTokens.layout.mobile_breakpoint_width }; 
  --sidebar-max-width: ${ jsonTokens.layout.sidebar_max_width }; 
  --main-content-max-width: ${ jsonTokens.layout.main_content_max_width }; 
  --main-content-left-margin-max-width: ${ jsonTokens.layout.main_content_left_margin_max_width }; 
  --breakpoint-width-small: ${ jsonTokens.layout.container_breakpoint_width_small }; 
  --breakpoint-width-medium: ${ jsonTokens.layout.container_breakpoint_width_medium }; 
  --breakpoint-width-large: ${ jsonTokens.layout.container_breakpoint_width_large }; 
  --flex-grow-max: ${ jsonTokens.layout.flex_grow_max }; 


  /* color variables */
  --brand-primary: #${ jsonTokens.color.brand_primary }; 
  --brand-secondary: #${ jsonTokens.color.brand_secondary }; 
  --banner-light: #${ jsonTokens.color.banner_light }; 
  --banner-dark: #${ jsonTokens.color.banner_dark }; 
  --brand-hover-light: #${ jsonTokens.color.brand_hover_light }; 
  --brand-hover-dark: #${ jsonTokens.color.brand_hover_dark }; 
  --navigation-hover-light: #${ jsonTokens.color.navigation_hover_light }; 
  --navigation-hover-dark: #${ jsonTokens.color.navigation_hover_dark }; 
  --background-primary-light: #${ jsonTokens.color.background_primary_light }; 
  --background-primary-dark: #${ jsonTokens.color.background_primary_dark }; 
  --background-secondary-light: #${ jsonTokens.color.background_secondary_light }; 
  --background-secondary-dark: #${ jsonTokens.color.background_secondary_dark }; 
  --action-primary: #${ jsonTokens.color.action_primary }; 
  --action-secondary: #${ jsonTokens.color.action_secondary }; 
  --action-secondary-hover: #${ jsonTokens.color.action_secondary_hover }; 
  --main-light: #${ jsonTokens.color.main_light }; 
  --main-dark: #${ jsonTokens.color.main_dark }; 
  --navigation-submenu-dark: #${ jsonTokens.color.navigation_submenu_dark }; 
  --navigation-submenu-light: #${ jsonTokens.color.navigation_submenu_light }; 
  --utility-dark: #${ jsonTokens.color.utility_dark }; 
  --utility-dark-grey: #${ jsonTokens.color.utility_dark_grey }; 
  --utility-mid-grey: #${ jsonTokens.color.utility_mid_grey }; 
  --utility-light-grey: #${ jsonTokens.color.utility_light_grey }; 
  --text-dark: #${ jsonTokens.color.text_dark }; 
  --text-white: #${ jsonTokens.color.text_white }; 
  --hyperlink-light: #${ jsonTokens.color.hyperlink_light }; 
  --hyperlink-activated-light: #${ jsonTokens.color.hyperlink_activated_light }; 
  --hyperlink-dark: #${ jsonTokens.color.hyperlink_dark }; 
  --hyperlink-activated-dark: #${ jsonTokens.color.hyperlink_activated_dark }; 
  --white: #${ jsonTokens.color.white }; 
  --gray-10: #${ jsonTokens.color.gray_10 }; 
  --gray-25: #${ jsonTokens.color.gray_25 };
  --gray-50: #${ jsonTokens.color.gray_50 };
  --gray-75: #${ jsonTokens.color.gray_75 };
  --gray-100: #${ jsonTokens.color.gray_100 };
  --gray-200: #${ jsonTokens.color.gray_200 };
  --gray-300: #${ jsonTokens.color.gray_300 };
  --gray-400: #${ jsonTokens.color.gray_400 };
  --gray-500: #${ jsonTokens.color.gray_500 };
  --gray-600: #${ jsonTokens.color.gray_600 };
  --gray-700: #${ jsonTokens.color.gray_700 };
  --gray-800: #${ jsonTokens.color.gray_800 };
  --gray-900: #${ jsonTokens.color.gray_900 };
  --gray-1000: #${ jsonTokens.color.gray_1000 };
  --black: #${ jsonTokens.color.black };

  /* theme default variables  */
  --background-color: var(--main-light);
  --text-color: var(--text-dark);
  --link-color: var(--hyperlink-light);
  --active-link-color: var(--hyperlink-activated-light);

  /* border variables */
  --border-1px: ${ jsonTokens.border.border_1 }; 
  --border-2px: calc(${ jsonTokens.border.border_1 } * 2); 
  --border-4px: calc(${ jsonTokens.border.border_1 } * 4); 
  --border-8px: calc(${ jsonTokens.border.border_1 } * 8);
  --border-radius-sm: calc(${ jsonTokens.border.radius } / 2); 
  --border-radius: ${ jsonTokens.border.radius };
  --border-radius-lg: calc(${ jsonTokens.border.radius } * 2); 
  --border-radius-round: 50%;
  --rounded-buttons:  ${ jsonTokens.border.rounded_buttons };

  /* spacing variables */
  --space-unit-1: ${ jsonTokens.spacing.unit };
  --space-unit-x2: calc(${ jsonTokens.spacing.unit } * 2);
  --space-unit-x4: calc(${ jsonTokens.spacing.unit } * 4);
  --space-unit-x8: calc(${ jsonTokens.spacing.unit } * 8);
  --space-unit-x16: calc(${ jsonTokens.spacing.unit } * 16);

  /* typography variables */
  --font-family:  ${ jsonTokens.typography.font };
  --text-max-width:  ${ jsonTokens.typography.text_max_width };
  --font-size-base:  ${ jsonTokens.typography.font_size_base };
  --font-weight-base: ${ jsonTokens.typography.font_weight_base };
  --line-height-base: ${ jsonTokens.typography.line_height_base };
  --ratio:  ${ jsonTokens.typography.ratio };
  --font-size-base-plus-viewport-adjustment: calc(var(--font-size-base) + .2vw);

  /* small text font  */
  --small-text: calc(var(--font-size-base-plus-viewport-adjustment) - .1em);
  --small-text-font-weight: ${ jsonTokens.typography.small_text_font_weight };
  --small-text-line-height: ${ jsonTokens.typography.small_text_line_height };

  /* standard paragraph font  */
  --p-font-size: calc(var(--font-size-base-plus-viewport-adjustment) * var(--ratio));
  --p-line-height: ${ jsonTokens.typography.p_line_height };
    
  /* Lead text font */
  --lead-text: calc(var(--p-font-size) * var(--ratio));
  --lead-text-line-height: ${ jsonTokens.typography.lead_text_line_height };
    
  /* headings fonts  */
  --h6: calc(var(--font-size-base-plus-viewport-adjustment) * var(--ratio));
  --h5: calc(var(--h6) * var(--ratio));
  --h4: calc(var(--h5) * var(--ratio));
  --h3: calc(var(--h4) * var(--ratio));
  --h2: calc(var(--h3) * var(--ratio));
  --h1: calc(var(--h2) * var(--ratio) * var(--ratio));
  --h1-font-weight: ${ jsonTokens.typography.h1_font_weight };
  --h1-line-height: ${ jsonTokens.typography.h1_line_height };
  --h2-font-weight: ${ jsonTokens.typography.h2_font_weight };
  --h2-line-height: ${ jsonTokens.typography.h2_line_height };
  --h3-font-weight: ${ jsonTokens.typography.h3_font_weight };
  --h3-line-height: ${ jsonTokens.typography.h3_line_height };
  --h4-font-weight: ${ jsonTokens.typography.h4_font_weight };
  --h4-line-height: ${ jsonTokens.typography.h4_line_height };
  --h5-font-weight: ${ jsonTokens.typography.h5_font_weight };
  --h5-line-height: ${ jsonTokens.typography.h5_line_height };

  /* icons */
  --search-icon-light: url("data:image/svg+xml;charset=UTF-8,%3Csvg viewBox='0 0 16.5 16.7' fill='%23${ jsonTokens.color.white }' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.2,15l-4-4c2-2.6,1.8-6.4-0.6-8.8c-1.3-1.3-3-2-4.7-2s-3.4,0.6-4.7,2c-2.6,2.6-2.6,6.9,0,9.5 c1.3,1.3,3,2,4.7,2c1.4,0,2.9-0.4,4-1.4l4,4c0.2,0.2,0.4,0.3,0.6,0.3c0.2,0,0.5-0.1,0.6-0.3C16.5,16,16.5,15.4,16.2,15L16.2,15z M6.8,11.9c-1.3,0-2.5-0.5-3.5-1.4c-1.9-1.9-1.9-5,0-6.9c0.9-0.9,2.1-1.4,3.5-1.4s2.5,0.5,3.5,1.4c0.9,0.9,1.4,2.1,1.4,3.5 s-0.5,2.5-1.4,3.5C9.4,11.4,8.1,11.9,6.8,11.9z'%3E%3C/path%3E%3C/svg%3E");
  --search-icon-dark: url("data:image/svg+xml;charset=UTF-8,%3Csvg viewBox='0 0 16.5 16.7' fill='%23${ jsonTokens.color.text_dark }' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.2,15l-4-4c2-2.6,1.8-6.4-0.6-8.8c-1.3-1.3-3-2-4.7-2s-3.4,0.6-4.7,2c-2.6,2.6-2.6,6.9,0,9.5 c1.3,1.3,3,2,4.7,2c1.4,0,2.9-0.4,4-1.4l4,4c0.2,0.2,0.4,0.3,0.6,0.3c0.2,0,0.5-0.1,0.6-0.3C16.5,16,16.5,15.4,16.2,15L16.2,15z M6.8,11.9c-1.3,0-2.5-0.5-3.5-1.4c-1.9-1.9-1.9-5,0-6.9c0.9-0.9,2.1-1.4,3.5-1.4s2.5,0.5,3.5,1.4c0.9,0.9,1.4,2.1,1.4,3.5 s-0.5,2.5-1.4,3.5C9.4,11.4,8.1,11.9,6.8,11.9z'%3E%3C/path%3E%3C/svg%3E");
  --cagov-icon-light: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M25.9068 27.9804L23.6088 25.2227C21.4918 26.9887 18.7676 28.0513 15.7951 28.0513C9.05442 28.0513 3.58999 22.5869 3.58999 15.8462C3.58999 9.10544 9.05442 3.64101 15.7951 3.64101C18.7676 3.64101 21.4918 4.70357 23.6088 6.46957L25.9068 3.7119C23.1672 1.4264 19.6416 0.0512695 15.7949 0.0512695C7.07161 0.0512695 0 7.12288 0 15.8462C0 24.5694 7.07161 31.6411 15.7949 31.6411C19.6416 31.6411 23.1672 30.2659 25.9068 27.9804Z" fill="%23${ jsonTokens.color.white }"/><path d="M27.0018 20.6891C27.6442 19.2044 28.0003 17.5669 28.0003 15.8462C28.0003 12.8516 26.9219 10.1089 25.1322 7.98535C25.1102 7.98774 25.0878 7.99004 25.0654 7.99233C24.9549 8.00367 24.8438 8.01506 24.7741 8.03858C23.6497 8.42009 22.7564 9.46828 22.1607 10.1673C21.911 10.4602 21.7136 10.6918 21.5734 10.7873C21.5153 10.5665 20.8208 9.60004 19.5272 9.60004C18.9542 9.60004 18.5465 9.80828 18.2362 10.1673C17.7336 10.7488 17.5758 11.5887 17.5901 12.0411C17.5971 12.2651 16.3279 12.9568 16.2381 13.0707C16.1043 13.2544 15.8683 13.5276 15.5939 13.8452C15.0382 14.4885 14.325 15.3141 13.9842 15.9483C13.8734 16.1544 13.8865 16.5365 13.8994 16.9116C13.9109 17.2464 13.9222 17.5757 13.8451 17.7696C13.5625 18.4793 12.4875 19.536 11.685 20.3248C11.2274 20.7747 10.8584 21.1375 10.7755 21.299C10.6305 21.6844 13.158 23.8038 14.2262 24.0901C15.2811 24.0901 17.1979 23.768 18.4504 23.5575C18.9431 23.4747 19.333 23.4092 19.5272 23.3874C19.6656 23.3841 19.8741 23.4469 20.1427 23.5278C20.6981 23.6951 21.5106 23.9398 22.4919 23.8382C23.632 23.6016 24.1877 22.8617 24.6953 22.1857C25.043 21.7228 25.3681 21.2899 25.843 21.069C26.1903 20.9073 26.5956 20.7709 27.0018 20.6891Z" fill="%23${ jsonTokens.color.white }"/><path d="M10.2865 15.0564C9.79093 14.6829 8.78834 13.9228 8.77314 13.911C8.57755 13.7599 8.57841 13.7611 8.38426 13.9101C7.90247 14.2806 6.90332 15.0561 6.86489 15.0434C6.86489 14.9026 7.27241 13.5727 7.43845 13.0423C7.47115 12.9382 7.43559 12.9018 7.37221 12.8536C6.85342 12.4576 5.78974 11.6387 5.74414 11.5947C5.99852 11.5947 7.33579 11.5628 7.78431 11.5707C7.84482 11.5719 7.89071 11.5677 7.91308 11.4927C8.11641 10.8146 8.3226 10.1373 8.5288 9.45642C8.59161 9.49131 9.01461 10.8428 9.19815 11.4605C9.23085 11.571 9.28275 11.5707 9.36104 11.5707C10.0198 11.5698 10.6782 11.5701 11.3441 11.5701C11.3232 11.6663 9.83223 12.7877 9.74619 12.8533C9.67134 12.9103 9.66589 12.9461 9.69285 13.0326C9.87897 13.634 10.3157 14.9593 10.2862 15.0561L10.2865 15.0564Z" fill="%23${ jsonTokens.color.white }"/></svg>');
  --cagov-icon-dark: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M25.9068 27.9804L23.6088 25.2227C21.4918 26.9887 18.7676 28.0513 15.7951 28.0513C9.05442 28.0513 3.58999 22.5869 3.58999 15.8462C3.58999 9.10544 9.05442 3.64101 15.7951 3.64101C18.7676 3.64101 21.4918 4.70357 23.6088 6.46957L25.9068 3.7119C23.1672 1.4264 19.6416 0.0512695 15.7949 0.0512695C7.07161 0.0512695 0 7.12288 0 15.8462C0 24.5694 7.07161 31.6411 15.7949 31.6411C19.6416 31.6411 23.1672 30.2659 25.9068 27.9804Z" fill="%23${ jsonTokens.color.brand_primary }"/><path d="M27.0018 20.6891C27.6442 19.2044 28.0003 17.5669 28.0003 15.8462C28.0003 12.8516 26.9219 10.1089 25.1322 7.98535C25.1102 7.98774 25.0878 7.99004 25.0654 7.99233C24.9549 8.00367 24.8438 8.01506 24.7741 8.03858C23.6497 8.42009 22.7564 9.46828 22.1607 10.1673C21.911 10.4602 21.7136 10.6918 21.5734 10.7873C21.5153 10.5665 20.8208 9.60004 19.5272 9.60004C18.9542 9.60004 18.5465 9.80828 18.2362 10.1673C17.7336 10.7488 17.5758 11.5887 17.5901 12.0411C17.5971 12.2651 16.3279 12.9568 16.2381 13.0707C16.1043 13.2544 15.8683 13.5276 15.5939 13.8452C15.0382 14.4885 14.325 15.3141 13.9842 15.9483C13.8734 16.1544 13.8865 16.5365 13.8994 16.9116C13.9109 17.2464 13.9222 17.5757 13.8451 17.7696C13.5625 18.4793 12.4875 19.536 11.685 20.3248C11.2274 20.7747 10.8584 21.1375 10.7755 21.299C10.6305 21.6844 13.158 23.8038 14.2262 24.0901C15.2811 24.0901 17.1979 23.768 18.4504 23.5575C18.9431 23.4747 19.333 23.4092 19.5272 23.3874C19.6656 23.3841 19.8741 23.4469 20.1427 23.5278C20.6981 23.6951 21.5106 23.9398 22.4919 23.8382C23.632 23.6016 24.1877 22.8617 24.6953 22.1857C25.043 21.7228 25.3681 21.2899 25.843 21.069C26.1903 20.9073 26.5956 20.7709 27.0018 20.6891Z" fill="%23${ jsonTokens.color.brand_primary }"/><path d="M10.2865 15.0564C9.79093 14.6829 8.78834 13.9228 8.77314 13.911C8.57755 13.7599 8.57841 13.7611 8.38426 13.9101C7.90247 14.2806 6.90332 15.0561 6.86489 15.0434C6.86489 14.9026 7.27241 13.5727 7.43845 13.0423C7.47115 12.9382 7.43559 12.9018 7.37221 12.8536C6.85342 12.4576 5.78974 11.6387 5.74414 11.5947C5.99852 11.5947 7.33579 11.5628 7.78431 11.5707C7.84482 11.5719 7.89071 11.5677 7.91308 11.4927C8.11641 10.8146 8.3226 10.1373 8.5288 9.45642C8.59161 9.49131 9.01461 10.8428 9.19815 11.4605C9.23085 11.571 9.28275 11.5707 9.36104 11.5707C10.0198 11.5698 10.6782 11.5701 11.3441 11.5701C11.3232 11.6663 9.83223 12.7877 9.74619 12.8533C9.67134 12.9103 9.66589 12.9461 9.69285 13.0326C9.87897 13.634 10.3157 14.9593 10.2862 15.0561L10.2865 15.0564Z" fill="%23${ jsonTokens.color.brand_primary }"/></svg>');
  --login-icon-light: url("data:image/svg+xml;charset=UTF-8,%3Csvg viewBox='0 0 32 32' fill='%23${ jsonTokens.color.white }' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16,0.4c-8.7,0-15.7,7-15.7,15.7s7,15.7,15.7,15.7s15.7-7,15.7-15.7S24.7,0.4,16,0.4z M16,4 c2.9,0,5.6,2.6,5.6,5.6c0,3-2.6,5.7-5.6,5.6c-2.9,0-5.6-2.6-5.6-5.6C10.4,6.6,13,4,16,4z M16,17.2c4.8,0,9.3,4.5,9.4,10.9 c-2.6,2-5.9,3.3-9.4,3.3c-3.5,0-6.7-1.2-9.3-3.2C6.8,21.7,11.2,17.2,16,17.2z'%3E%3C/path%3E%3C/svg%3E");
  --login-icon-dark: url("data:image/svg+xml;charset=UTF-8,%3Csvg viewBox='0 0 32 32' fill='%23${ jsonTokens.color.brand_primary }' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16,0.4c-8.7,0-15.7,7-15.7,15.7s7,15.7,15.7,15.7s15.7-7,15.7-15.7S24.7,0.4,16,0.4z M16,4 c2.9,0,5.6,2.6,5.6,5.6c0,3-2.6,5.7-5.6,5.6c-2.9,0-5.6-2.6-5.6-5.6C10.4,6.6,13,4,16,4z M16,17.2c4.8,0,9.3,4.5,9.4,10.9 c-2.6,2-5.9,3.3-9.4,3.3c-3.5,0-6.7-1.2-9.3-3.2C6.8,21.7,11.2,17.2,16,17.2z'%3E%3C/path%3E%3C/svg%3E");
  --search-submit-dark: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='25px' height='16px' viewBox='0 0 25 16'><path style='fill:%23${ jsonTokens.color.banner_dark };' d='M24.5,7.3l-6.4-6.4c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L21.4,7H0.1v2h21.3l-4.7,4.7c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l6.4-6.4C24.9,8.3,24.9,7.7,24.5,7.3z'/></svg>");
  --search-submit-light: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='25px' height='16px' viewBox='0 0 25 16'><path style='fill:%23${ jsonTokens.color.navigation_submenu_light };' d='M24.5,7.3l-6.4-6.4c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L21.4,7H0.1v2h21.3l-4.7,4.7c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l6.4-6.4C24.9,8.3,24.9,7.7,24.5,7.3z'/></svg>");
  --search-input-clear-dark: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px' viewBox='0 0 16 16'><path style='fill:%23${ jsonTokens.color.text_dark };' d='M9.3,8L9.3,8L8.9,7.5l5.8-5.8c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L7.9,5.7l0,0L7.4,6.1L1.7,0.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3l0,0L6,7.5l-5.8,5.8c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0L7,9.4l0,0L7.4,9l5.8,5.8c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4L9.3,8z'/></svg>");
  --search-input-clear-light: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px' viewBox='0 0 16 16'><path style='fill:%23${ jsonTokens.color.navigation_submenu_light };' d='M9.3,8L9.3,8L8.9,7.5l5.8-5.8c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L7.9,5.7l0,0L7.4,6.1L1.7,0.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3l0,0L6,7.5l-5.8,5.8c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0L7,9.4l0,0L7.4,9l5.8,5.8c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4L9.3,8z'/></svg>");
}`;

export default class {
  data() {
		return {
			layout: null,
      permalink: "/parts/tokens/tokens.css"
		};
	}

	async render() {
		const jsonTokens = await fs
      .readFile("./parts/tokens/tokens-figma.json")
      .then((json) => JSON.parse(json));

		return variables(jsonTokens);
	}
}