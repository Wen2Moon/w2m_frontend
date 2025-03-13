import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useStoreShowFeature } from '@/store';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';

export default function LinearDeterminate() {
    const [progress, setProgress] = React.useState(0);
    const { updateFeatureShow } = useStoreShowFeature();
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    return 100;
                }
                switch (prevProgress) {
                    case 8: {
                        updateFeatureShow({
                            1: true,
                            2: false,
                            3: false,
                            4: false,
                            5: false,
                            6: false,
                            7: false,
                            8: false,
                            9: false,
                            10: false
                        })
                        break;
                    }
                    case 20: {
                        updateFeatureShow({
                            1: true,
                            2: false,
                            3: false,
                            4: false,
                            5: false,
                            6: true,
                            7: false,
                            8: false,
                            9: false,
                            10: false
                        })
                        break;
                    }
                    case 32: {
                        updateFeatureShow({
                            1: true,
                            2: true,
                            3: false,
                            4: false,
                            5: false,
                            6: true,
                            7: false,
                            8: false,
                            9: false,
                            10: false
                        })
                        break;
                    }
                    case 42: {
                        updateFeatureShow({
                            1: true,
                            2: true,
                            3: false,
                            4: false,
                            5: false,
                            6: true,
                            7: true,
                            8: false,
                            9: false,
                            10: false
                        })
                        break;
                    }
                    case 52: {
                        updateFeatureShow({
                            1: true,
                            2: true,
                            3: true,
                            4: false,
                            5: false,
                            6: true,
                            7: true,
                            8: false,
                            9: false,
                            10: false
                        })
                        break;
                    }
                    case 66: {
                        updateFeatureShow({
                            1: true,
                            2: true,
                            3: true,
                            4: false,
                            5: false,
                            6: true,
                            7: true,
                            8: true,
                            9: false,
                            10: false
                        })
                        break;
                    }
                    case 74: {
                        updateFeatureShow({
                            1: true,
                            2: true,
                            3: true,
                            4: true,
                            5: false,
                            6: true,
                            7: true,
                            8: true,
                            9: false,
                            10: false
                        })
                        break;
                    }
                    case 82: {
                        updateFeatureShow({
                            1: true,
                            2: true,
                            3: true,
                            4: true,
                            5: false,
                            6: true,
                            7: true,
                            8: true,
                            9: true,
                            10: true
                        })
                        break;
                    }
                    case 100: {
                        updateFeatureShow({
                            1: true,
                            2: true,
                            3: true,
                            4: true,
                            5: true,
                            6: true,
                            7: true,
                            8: true,
                            9: true,
                            10: true
                        })
                        break;
                    }
                }
                return (prevProgress >= 100 ? 10 : prevProgress + 2)
            })
        }, 125);

        return () => {
            clearInterval(timer);
        };
    }, [updateFeatureShow]);

    return (
        <Box sx={{
            width: '100%',
            position: 'relative',
            zIndex: 0,
            top: '10px',
        }}
            className="progressBar"
        >
            <LinearProgress
                sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#fff'
                  }
                }}
                variant="determinate"
                value={progress}
            />
            {/* <NavigateNextSharpIcon
                fontSize='medium'
                style={{
                    position: "absolute",
                    top: "-11px",
                    right: "-11px",
                    fontSize: '26px',
                    color: progress !== 100 ? "rgb(167, 202, 237)" : "#1976d2"
                }}
            /> */}
        </Box>
    );
}
