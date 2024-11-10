export interface NavTreeNode{
    id: String,
    label: String,
    uri?: String
    icon?: String
    children: Array<NavTreeNode>
}

export interface NavTree{
    rootNodes: Array<NavTreeNode>
}
