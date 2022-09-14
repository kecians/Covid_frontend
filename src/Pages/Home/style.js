
export const getComputedStyle = (theme) => ( {

    tabs : {

        borderColor: "divider",
        height : "auto",
        marginTop : "100px",
        paddingLeft : "10px",
        '& .MuiButtonBase-root ' : {
            minHeight : "60px",
            justifyContent : "flex-start"

        }
    },

    tab : {
        margin : "5px 0px",
        textTransform : "unset !important",
        height : "10px",
        textAlign : "left",
        color : theme.palette.text.ternary,
        fontSize : theme.size.text.p3,
        '& svg' : {
            color : theme.palette.text.primary
        }
    },
    gridItem1 : {
        background : theme.palette.v2.primary,
        position : "sticky",
        top : '0px',
        height : "100vh",
        borderRight : "1px solid" + theme.palette.border.primary,

    }

})