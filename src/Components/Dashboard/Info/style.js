
export const getComputedStyle = (theme) => ( {

    tabs : {

        borderColor: "divider",
        height : "auto",
        '& .MuiButtonBase-root ' : {
            minHeight : "40px",
            justifyContent : "flex-start",
            padding : "5px 20px",
            background  : theme.palette.v2.secondary,
            borderRadius : "20px",
            margin : "5px 8px"

        }
    },

    tab : {
        margin : "21px 22px",
        textTransform : "unset !important",
        height : "10px",
        margin : "0px",
        textAlign : "left",
        color : `${theme.palette.text.light} !important`,
        fontSize : theme.size.text.p2,
        padding : "10px 15px !important"
    },
    gridItem1 : {
        background : theme.palette.v2.primary,
        position : "sticky",
        top : '0px',
        height : "100vh",
        borderRight : "1px solid" + theme.palette.border.primary,

    }

})