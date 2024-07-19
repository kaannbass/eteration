import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

interface ProductActionsProps {
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
    onIncrease: () => void;
    style?: StyleProp<ViewStyle>;
}

const ProductActions: React.FC<ProductActionsProps> = ({ quantity, onAdd, onRemove, onIncrease, style }) => (
    <View style={styles.actionsContainer}>
        {quantity <= 0 ? (
            <Button onPress={onAdd}>Add To Card</Button>
        ) : (
            <>
                <Button style={style} onPress={onRemove}>-</Button>
                <Text style={styles.quantityText}>{quantity}</Text>
                <Button style={style} onPress={onIncrease}>+</Button>
            </>
        )}
    </View>
);

export default ProductActions

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 20,
    },
});