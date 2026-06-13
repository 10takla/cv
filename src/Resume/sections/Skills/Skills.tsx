import { cloneElement, ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import SvgStar from "shared/assets/icons/star.svg?react";
import { VStack } from "shared/ui/Stack";
import { skills } from '/src/Resume/shared/const/info';
import { langContext, T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { classNames } from '/src/shared/lib/classNames/classNames';
import getRgbGradient from '/src/shared/lib/getRgbGradient/getRgbGradient';
import { HStack } from '/src/shared/ui/Stack';
import Tag from "/src/shared/ui/Stack/Tag/Tag";
import cls from './Skills.module.scss';
import SkillLine from './ui/SkillLine/SkillLine';
import Highlight from '/src/Resume/shared/ui/Hightlight/Hightlight';
import { useLocation, useNavigate } from 'react-router-dom';
import Portal from '/src/shared/ui/Portal/Portal';
import { createPortal } from 'react-dom';
import starUrl from "shared/assets/icons/star.svg?url";

type Component = typeof VStack;
type ElRef = ElementRef<Component> | null;

interface SkillsProps extends ComponentProps<Component> {

}

const Skills = (props: SkillsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const skillsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => skillsRef.current,
    );

    return (
        <VStack tag="ol"
            className={classNames(cls.Skills, ["skills"])}
            ref={skillsRef}
            {...otherProps}
        >
            {
                skills.map(({ block, skills }, i) => (
                    <VStack tag="li" className={cls.skillBlock} key={i}>
                        {block}:
                        <HStack tag="ul" className={cls.skills}>
                            {skills.flatMap((skill: any) => skill.childs ? skill.childs : [skill]).map((skill, i) => (
                                <Highlight id={skill.isId && `${skill.name}`} className={cls.skill} key={i}>
                                    <HStack className={cls.skill} key={i} tag="li" align="stretch"
                                        style={{ "--color": getRgbGradient(skill.stars, { saturation: 60 }) }}
                                    >
                                        <Tag className={cls.name}
                                            tag={skill.link ? "a" : "span"} href={skill.link}
                                        >
                                            {skill.en ? <T ru={skill.name} en={skill.en} /> : skill.name}
                                        </Tag>
                                        <HStack
                                            className={cls.level}
                                            align="center"
                                            style={{ "--color": getRgbGradient(skill.stars, { saturation: 40 }) }}
                                        >
                                            {"level" in skill ? skill.level :
                                                <>
                                                    <meter max={5} value={skill.stars} />
                                                    <HStack className={cls.backGround} aria-hidden={true}>
                                                        {new Array(5).fill(null).map((_, i) => (
                                                            <SvgStar key={i} />
                                                        ))}
                                                        <HStack className={cls.frontGround} >
                                                            {new Array(skill.stars).fill(null).map((_, i) => (
                                                                <SvgStar key={i} />
                                                            ))}
                                                        </HStack>
                                                    </HStack>
                                                </>
                                            }
                                        </HStack>
                                    </HStack>
                                </Highlight>
                            ))}
                        </HStack>
                    </VStack>
                ))}
        </VStack>
    )
};

export default memo(forwardRef(Skills));