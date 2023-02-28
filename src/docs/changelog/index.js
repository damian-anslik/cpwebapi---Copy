const changelog = [
    {
        title: 'Added authentication information for institutional clients',
        date: '2022-09-30',
        description: 'Added authentication information for institutional clients',
        changes: [
            'Added information about authentication methods for institutional clients',
            'Added required attributes to the market data snapshot request',
            'Renamed Workflows page to Use Cases',
            'Minor visual bug fixes',
        ],
        tags: [
            'documentation',
            'authentication',
            'endpoints'
        ]
    },
    {
        title: 'Updated list of endpoints and add minor bug fixes',
        date: '2022-09-08',
        description: 'Updated swagger endpoints and minor bug fixes',
        changes: [
            'Updated list of swagger endpoints',
            'Fixed bug with institutional workflows page'
        ],
        tags: [
            'documentation',
            'endpoints',
        ]
    },
    {
        title: 'Further formatting updates',
        date: '2022-09-01',
        description: 'Improved visual look of code samples and fixed some broken links',
        changes: [
            'Added syntax highlighting to code samples',
            'Added a copy to clipboard button to code samples',
            'Add support for landscape orientation on mobile devices',
            'Updated table styling',
            'Fixed broken links for swagger.json and references to the websockets page'
        ],
        tags: [
            'documentation'
        ]
    },
    {
        title: 'Added new topics and improved formatting',
        date: '2022-08-25',
        description: 'Added new websockets, endpoints and workflows documentation and improved formatting of code examples',
        changes: [
            'New <a href="./websockets#market-depth-data">market depth topic</a> added to websockets documentation',
            'Improved formatting of code examples',
            'Added information about trailing type orders to the orders endpoint',
            'Added endpoint specific <a href="./use-cases#pacing-limitations">pacing limitations</a>',
        ],
        tags: [
            'documentation',
            'websockets',
            'endpoints',
            'workflows'
        ]
    },
    {
        title: 'New API documentation released',
        date: '2022-08-16',
        description: 'New API documentation released',
        changes: [
            'Released new Client Portal API documentation',
            'Visual overhaul of the documentation UI',
            'Grouped topics into relevant sections',
            'Institutional topics are in progress and will be released during the week'
        ],
        tags: [
            'documentation',
        ]
    },
]

export { changelog }