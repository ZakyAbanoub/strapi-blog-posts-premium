import type { Schema, Attribute } from '@strapi/strapi';

export interface BlogPostsSelection extends Schema.Component {
  collectionName: 'components_blog_posts_selections';
  info: {
    displayName: 'postsSelection';
    icon: 'bulletList';
  };
  attributes: {
    heading: Attribute.String;
    featuredPosts: Attribute.Relation<
      'blog.posts-selection',
      'oneToMany',
      'api::post.post'
    >;
  };
}

export interface ConfigSocialLink extends Schema.Component {
  collectionName: 'components_config_social_links';
  info: {
    displayName: 'socialLink';
    icon: 'phone';
  };
  attributes: {
    socialMedia: Attribute.Enumeration<
      ['github', 'youtube', 'twitter', 'facebook', 'whatsapp']
    > &
      Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface LayoutFeaturedCourse extends Schema.Component {
  collectionName: 'components_layout_featured_courses';
  info: {
    displayName: 'featuredCourse';
    icon: 'crown';
  };
  attributes: {
    course: Attribute.Relation<
      'layout.featured-course',
      'oneToOne',
      'api::course.course'
    >;
    heading: Attribute.String;
    description: Attribute.Text;
  };
}

export interface LayoutHero extends Schema.Component {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'hero';
    icon: 'grid';
  };
  attributes: {
    callToAction: Attribute.String & Attribute.Required;
    image: Attribute.Media;
    buttons: Attribute.Component<'layout.link', true>;
  };
}

export interface LayoutLink extends Schema.Component {
  collectionName: 'components_layout_links';
  info: {
    displayName: 'link';
    icon: 'arrowRight';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface LayoutMission extends Schema.Component {
  collectionName: 'components_layout_missions';
  info: {
    displayName: 'mission';
    icon: 'priceTag';
  };
  attributes: {
    heading: Attribute.String & Attribute.DefaultTo<'Our Mission'>;
    content: Attribute.Text & Attribute.Required;
    showLogo: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface LayoutNewsletterForm extends Schema.Component {
  collectionName: 'components_layout_newsletter_forms';
  info: {
    displayName: 'newsletterForm';
    icon: 'envelop';
  };
  attributes: {
    heading: Attribute.String &
      Attribute.DefaultTo<'Subscibe to our newsletter'>;
    subHeading: Attribute.Text;
  };
}

export interface LayoutPageInfo extends Schema.Component {
  collectionName: 'components_layout_page_infos';
  info: {
    displayName: 'pageInfo';
    icon: 'file';
  };
  attributes: {
    content: Attribute.Blocks;
    cover: Attribute.Media;
    seo: Attribute.Component<'seo.seo-information'>;
  };
}

export interface LayoutServicesPreview extends Schema.Component {
  collectionName: 'components_layout_services_previews';
  info: {
    displayName: 'servicesPreview';
    icon: 'bulletList';
  };
  attributes: {
    services: Attribute.Relation<
      'layout.services-preview',
      'oneToMany',
      'api::service.service'
    >;
  };
}

export interface SeoSeoInformation extends Schema.Component {
  collectionName: 'components_seo_seo_informations';
  info: {
    displayName: 'seoInformation';
    icon: 'search';
  };
  attributes: {
    seoTitle: Attribute.String;
    seoDescription: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blog.posts-selection': BlogPostsSelection;
      'config.social-link': ConfigSocialLink;
      'layout.featured-course': LayoutFeaturedCourse;
      'layout.hero': LayoutHero;
      'layout.link': LayoutLink;
      'layout.mission': LayoutMission;
      'layout.newsletter-form': LayoutNewsletterForm;
      'layout.page-info': LayoutPageInfo;
      'layout.services-preview': LayoutServicesPreview;
      'seo.seo-information': SeoSeoInformation;
    }
  }
}
