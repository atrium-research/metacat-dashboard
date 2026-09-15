"use client";

import { type ReactNode } from "react";
import {
    Slider as AriaSlider,
    type SliderProps as AriaSliderProps,
    SliderFill,
    SliderThumb,
    SliderTrack,
} from "react-aria-components/Slider";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn } from "@/utils/global.utils";
import {
    sliderFillVariants,
    sliderRailVariants,
    sliderThumbVariants,
    sliderTrackVariants,
    sliderVariants,
} from "@/components/ui/Slider/Slider.styles";

export type SliderProps<T extends number | number[] = number> = Omit<
    AriaSliderProps<T>,
    "children"
>;

export function Slider<T extends number | number[] = number>(
    props: Readonly<SliderProps<T>>,
): ReactNode {
    const { className, ...rest } = props;
    return (
        <AriaSlider
            {...rest}
            className={composeRenderProps(
                className,
                (className, renderProps) => (
                    cn(
                        sliderVariants({
                            orientation: renderProps.orientation,
                        }),
                        className,
                    )
                )
            )}
        >
            {({ orientation, isDisabled }) => (
                <SliderTrack className={sliderTrackVariants({ orientation })}>
                    {({ state }) => (
                        <>
                            <div
                                className={sliderRailVariants({
                                    orientation,
                                    isDisabled,
                                })}
                            >
                                <SliderFill
                                    className={sliderFillVariants({
                                        isDisabled,
                                        isDragging: state.values.some(
                                            (_, index) => (
                                                state.isThumbDragging(index)
                                            )
                                        ),
                                    })}
                                />
                            </div>
                            {state.values.map((_, index) => (
                                <SliderThumb
                                    key={index}
                                    index={index}
                                    className={sliderThumbVariants({
                                        orientation,
                                    })}
                                />
                            ))}
                        </>
                    )}
                </SliderTrack>
            )}
        </AriaSlider>
    );
}
