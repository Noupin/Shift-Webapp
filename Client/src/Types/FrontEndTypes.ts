export const trainViewTypeArray = ['basic', 'advanced'] as const
export type trainViewType = typeof trainViewTypeArray[number]

export const uiStyleTypeArray = ['neumorphic', 'flat'] as const
export type uiStyleType = typeof uiStyleTypeArray[number]
