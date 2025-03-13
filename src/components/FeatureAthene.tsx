'use client'

import { Box } from "@mui/material";
import Image from "next/image"
import styles from "../styles/Feature.module.css";

interface FeatureAthenaProps {
    id: number;
    image: any;
    title: string;
    matches: boolean;
    description: string;
    maxWidth: string;
    showFeature?: boolean;
    link?: string;
    subTitle?: string;
    onClick?: any;
    classFeature?: any;
}
const FeatureAthena: React.FC<FeatureAthenaProps> = ({
    id,
    image,
    title,
    matches,
    description,
    maxWidth,
    showFeature,
    link,
    subTitle,
    onClick,
    classFeature,
}) => {
    return (
        <Box
            className={styles.containerHover}
            maxWidth={maxWidth}
            width={id === 9 && matches ? maxWidth: 'auto'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box width={'100%'} display={'flex'}
                flexDirection={'column'} gap={'2px'}
                alignItems={'center'}
                justifyContent={'center'}
                className={`${classFeature} ${showFeature ? 'showFeature ' : 'hidden '}`}
                onClick={() => {
                    if (link) {
                        window.open(link);
                    } else {
                        onClick()
                    }
                }}
            >
                <Box>
                    <Image
                        src={image}
                        alt={title}
                        loading="lazy"
                    />
                </Box>
                <Box textAlign={'center'} className={styles.title}>
                    {title}
                </Box>
                <Box textAlign={'center'} className={styles.description}>
                    <p>{subTitle}</p>
                    {description}
                </Box>
            </Box>
            {/* <Box 
                mt={4}
            >
                <Image src={dot} alt={""} />
            </Box> */}
        </Box>
    )
}

export default FeatureAthena;