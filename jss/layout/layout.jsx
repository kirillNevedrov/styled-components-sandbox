/*
 allowed styles:
 'display',
 'float', 'clear',
 'flexDirection', 'flexWrap', 'flexFlow', 'justifyContent', 'alignItems', 'alignContent',
 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flex', 'alignSelf',
 'width', 'maxWidth', 'minWidth',
 'height', 'maxHeight', 'minHeight',
 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'

 usage example:
     <L
       cache='global'
       stylesProps={{
         width: '700px'
       }}
       styles={{
         display: 'block',
         float: 'right',
         width: '100px',
         '&:hover': {
           width: '300px'
         },
         '@media (min-width: 1024px)': {
           width: p => p.width,
           '&:hover': {
             width: '600px'
           }
         }
       }}>
     </L>
 */

import React, {Component as C, PropTypes as T} from 'react';
import jss from 'jss';
import {forEach, reduce} from 'lodash';

class Layout extends C {
    static GlobalStylesCache = {}

    localStylesCache = {}
    styleSheet = null
    styleJson = null
    previousStyleJsons = []

    componentWillMount() {
        this.setStyleSheet(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.isPropsChanged(this.props.stylesProps, nextProps.stylesProps)) {
            this.setStyleSheet(nextProps);
        }
    }

    componentWillUnmount() {
        this.deleteStyleSheet(this.props);
    }

    getStylesCache(cacheType) {
        switch (cacheType) {
            case 'local':
                return this.localStylesCache;
            case 'global':
                return Layout.GlobalStylesCache;
            default:
                throw new Error('Cache type not supported');
        }
    }

    transformStyles(styles) {
        return {
            layout: styles
        };
    }

    deleteStyleSheet(props) {
        if (props.cache == null) {
            this.styleSheet && this.styleSheet.detach();
            return;
        }

        let removeStyleSheetFromCache = styleJson => {
            let cachedStyleSheet = this.getStylesCache(props.cache)[styleJson];

            cachedStyleSheet.counter -= 1;

            if (cachedStyleSheet.counter <= 0) {
                cachedStyleSheet.value && cachedStyleSheet.value.detach();
                delete this.getStylesCache(props.cache)[styleJson];
            }
        }

        removeStyleSheetFromCache(this.styleJson);
        this.previousStyleJsons.forEach(j => removeStyleSheetFromCache(j));
        this.previousStyleJsons = [];
    }

    setStyleSheet(props) {
        let styles = this.buildStyles(props.styles, props.stylesProps);

        if (props.cache == null) {
            let styleSheet = jss.createStyleSheet(this.transformStyles(styles)).attach();

            if (this.styleSheet != null) {
                this.styleSheet.detach();
            }

            this.styleSheet = styleSheet;
            return;
        }

        let styleJson = JSON.stringify(styles);
        let indexOfStyleJson = this.previousStyleJsons.indexOf(styleJson);

        if (this.styleJson != null && indexOfStyleJson === -1) {
            this.previousStyleJsons.push(this.styleJson);
        }

        this.styleJson = styleJson;
        let cachedStyleSheet = this.getStylesCache(props.cache)[this.styleJson];
        if (cachedStyleSheet != null) {
            this.styleSheet = cachedStyleSheet.value;
            if (indexOfStyleJson === -1) {
                cachedStyleSheet.coutner += 1;
            }
        }
        else {
            let styleSheet = jss.createStyleSheet(this.transformStyles(styles)).attach();
            this.getStylesCache(props.cache)[this.styleJson] = {
                value: styleSheet,
                coutner: 1
            };
            this.styleSheet = styleSheet;
        }
    }

    isPropsChanged(props, newProps) {
        if (props == null) {
            return newProps == null;
        }

        let keys = Object.keys(props);
        let newKeys = Object.keys(newProps);

        if (keys.length !== newKeys.length) {
            return true;
        }

        let isChanged = false;
        forEach(keys, key => {
            if (props[key] !== newProps[key]) {
                isChanged = true;
                return false;
            }
        });
        return isChanged;
    }

    buildStyles(stylesNode, stylesProps) {
        if (stylesNode == null) {
            return null;
        }

        let keys = Object.keys(stylesNode);

        return reduce(keys, (newStyleNode, key) => {
            let value = stylesNode[key];

            if (typeof value === 'object') {
                value = this.buildStyles(value, stylesProps);
            }
            else if (typeof value === 'function') {
                value = value(stylesProps);
            }

            return {
                ...newStyleNode,
                [key]: value
            };
        }, {});
    }

    render() {
        let {classes} = this.styleSheet;
        return (
            <div className={classes.layout}>{this.props.children}</div>
        );
    }
}

export default Layout;
