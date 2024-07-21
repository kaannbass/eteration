import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SkeletonLoader: React.FC = () => (
    <View style={styles.container}>
        <View style={styles.headerSkeleton} />
        <View style={styles.cardSkeletonContainer}>
            {[...Array(4)].map((_, index) => (
                <View key={index} style={styles.cardSkeleton} />
            ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    headerSkeleton: {
        height: 50,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
    },
    cardSkeletonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardSkeleton: {
        width: (width - 30) / 2,
        height: 350,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
    },
});

export default SkeletonLoader;
