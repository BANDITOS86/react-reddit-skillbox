import React from "react";
import styles from "./icon.css";
import classNames from "classnames";
import * as SvgIcon from './../Icons'

type TIconNames = "MenuIcon" | "BlockIcon" | "WarningIcon" | "SaveIcon" | "ShareIcon" | "CommentsIcon" | "AnswerIcon";
type TIconSizes = 12 | 1214 | 14 | 16;

interface IIconProps {
  name: TIconNames;
  icon?: React.ReactNode;
  size?: TIconSizes;
  mobileSize?: TIconSizes;
  tabletSize?: TIconSizes;
  desktopSize?: TIconSizes;
}

export function Icon(props: IIconProps) {
  const { name, icon, size = 14, mobileSize, tabletSize, desktopSize } = props;

  //  useState используется для управления состоянием svgIconComponent, 
  // которое представляет собой переменную, содержащую компонент иконки
  // svgIconComponent - это переменная, которая хранит значение текущего состояния 
  // useState принимает начальное значение состояния (значение icon) 
  // и возвращает массив с текущим значением состояния и функцией для его обновления
  const [svgIconComponent, setSvgIconComponent] = React.useState(icon);
  // console.log(svgIconComponent);
  // console.log(setSvgIconComponent);

  const classes = classNames(
    styles.icon,
    styles[`s${size}`],
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`d${desktopSize}`]]: desktopSize },
    { [styles[`t${tabletSize}`]]: tabletSize }
  );

  // useEffect принимает функцию обратного вызова и массив зависимостей. 
  // Если массив зависимостей пустой, то эффект будет выполнен только после первого рендеринга компонента.
  React.useEffect(() => {
    // Функция обратного вызова в данном случае проверяет, 
    // если значение svgIconComponent не определено (undefined), 
    // тогда она устанавливает его значением компонента, связанного с переданным именем name из импортированных SvgIcon. 
    // Это позволяет динамически подставить компонент иконки в компонент Icon
    if (typeof svgIconComponent === "undefined") {
      setSvgIconComponent(SvgIcon[name]);
    }
  }, []);

  return (
    <div className={classes}>
      {svgIconComponent}
    </div>
  )
}
