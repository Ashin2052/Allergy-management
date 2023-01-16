export const checkIfStringContainsSpaceInStartAndEnd = (
    str: string
): Boolean => {
    return str.startsWith(" ") || str.endsWith(" ");
};