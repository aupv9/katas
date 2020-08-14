(() => {
    const e = React.createElement

    const root = document.getElementById('root')

    function Clock() {
        return e('p', null, new Date().toISOString())
    }

    const tree = e(
        'p',
        null,
        [
            e(
                'p',
                null,
                'hello world'
            ),
            'stuff',
            e(Clock)
        ]
    )

    React.renderToDOM(tree, root)
})()