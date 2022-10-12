export enum FormRegExp{
    TITLE = "[!@#№$%^&*()+?/.,;:'\{}-]*",
    ONLY_NUM = "[^0-9]*",
    DECLINE_ZERO = "[0]",
    DECLINE_SPACE_AND_NUM = "[0-9 ]",
    DOUBLE_SEPARATORS = "[.,]",
    DECLINE_TITLE_END = "[ ]"
}