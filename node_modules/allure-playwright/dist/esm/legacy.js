import * as allure from "allure-js-commons";

/**
 * @deprecated please use api exported by "allure-js-commons" instead.
 */

/**
 * @deprecated please use api exported by "allure-js-commons" instead.
 */
export var allurePlaywrightLegacyApi = {
  /**
   * @deprecated please use import { label } from "allure-js-commons" instead.
   */
  label: function label() {
    return Promise.resolve(allure.label.apply(allure, arguments));
  },
  /**
   * @deprecated please use import { labels } from "allure-js-commons" instead.
   */
  labels: function labels() {
    return Promise.resolve(allure.labels.apply(allure, arguments));
  },
  /**
   * @deprecated please use import { link } from "allure-js-commons" instead.
   */
  link: function link(type, url, name) {
    return Promise.resolve(allure.link(url, name, type));
  },
  /**
   * @deprecated please use import { links } from "allure-js-commons" instead.
   */
  links: function links() {
    return Promise.resolve(allure.links.apply(allure, arguments));
  },
  /**
   * @deprecated please use import { parameter } from "allure-js-commons" instead.
   */
  parameter: function parameter(name, value, options) {
    return Promise.resolve(allure.parameter(name, value, options));
  },
  /**
   * @deprecated please use import { description } from "allure-js-commons" instead.
   */
  description: function description() {
    return Promise.resolve(allure.description.apply(allure, arguments));
  },
  /**
   * @deprecated please use import { descriptionHtml } from "allure-js-commons" instead.
   */
  descriptionHtml: function descriptionHtml(html) {
    return Promise.resolve(allure.descriptionHtml(html));
  },
  /**
   * @deprecated please use import { testCaseId } from "allure-js-commons" instead.
   */
  testCaseId: function testCaseId(id) {
    return Promise.resolve(allure.testCaseId(id));
  },
  /**
   * @deprecated please use import { historyId } from "allure-js-commons" instead.
   */
  historyId: function historyId(id) {
    return Promise.resolve(allure.historyId(id));
  },
  /**
   * @deprecated please use import { allureId } from "allure-js-commons" instead.
   */
  allureId: function allureId(id) {
    return Promise.resolve(allure.allureId(id));
  },
  /**
   * @deprecated please use import { displayName } from "allure-js-commons" instead.
   */
  displayName: function displayName(name) {
    return Promise.resolve(allure.displayName(name));
  },
  /**
   * @deprecated please use import { attachment } from "allure-js-commons" instead.
   */
  attachment: function attachment(name, content, type) {
    return Promise.resolve(allure.attachment(name, content, {
      contentType: type
    }));
  },
  /**
   * @deprecated please use import { issue } from "allure-js-commons" instead.
   */
  issue: function issue(name, url) {
    return Promise.resolve(allure.issue(url, name));
  },
  /**
   * @deprecated please use import { tms } from "allure-js-commons" instead.
   */
  tms: function tms(name, url) {
    return Promise.resolve(allure.tms(url, name));
  },
  /**
   * @deprecated please use import { epic } from "allure-js-commons" instead.
   */
  epic: function epic(name) {
    return Promise.resolve(allure.epic(name));
  },
  /**
   * @deprecated please use import { feature } from "allure-js-commons" instead.
   */
  feature: function feature(name) {
    return Promise.resolve(allure.feature(name));
  },
  /**
   * @deprecated please use import { story } from "allure-js-commons" instead.
   */
  story: function story(name) {
    return Promise.resolve(allure.story(name));
  },
  /**
   * @deprecated please use import { suite } from "allure-js-commons" instead.
   */
  suite: function suite(name) {
    return Promise.resolve(allure.suite(name));
  },
  /**
   * @deprecated please use import { parentSuite } from "allure-js-commons" instead.
   */
  parentSuite: function parentSuite(name) {
    return Promise.resolve(allure.parentSuite(name));
  },
  /**
   * @deprecated please use import { subSuite } from "allure-js-commons" instead.
   */
  subSuite: function subSuite(name) {
    return Promise.resolve(allure.subSuite(name));
  },
  /**
   * @deprecated please use import { owner } from "allure-js-commons" instead.
   */
  owner: function owner(name) {
    return Promise.resolve(allure.owner(name));
  },
  /**
   * @deprecated please use import { severity } from "allure-js-commons" instead.
   */
  severity: function severity(name) {
    return Promise.resolve(allure.severity(name));
  },
  /**
   * @deprecated please use import { layer } from "allure-js-commons" instead.
   */
  layer: function layer(name) {
    return Promise.resolve(allure.layer(name));
  },
  /**
   * @deprecated please use import { tag } from "allure-js-commons" instead.
   */
  tag: function tag(name) {
    return Promise.resolve(allure.tag(name));
  },
  /**
   * @deprecated please use import { tags } from "allure-js-commons" instead.
   */
  tags: function tags() {
    return Promise.resolve(allure.tags.apply(allure, arguments));
  },
  /**
   * @deprecated please use import { step } from "allure-js-commons" instead.
   */
  step: function step(name, body) {
    return Promise.resolve(allure.step(name, body));
  }
};
//# sourceMappingURL=legacy.js.map