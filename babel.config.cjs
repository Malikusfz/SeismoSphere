module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    ignore: ['node_modules/(?!react-leaflet|@react-leaflet|leaflet)'],
};
