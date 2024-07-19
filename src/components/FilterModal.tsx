import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  sortOrder: 'asc' | 'desc' | null;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  onApply: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, sortOrder, onSortOrderChange, onApply }) => (
  <Modal
    visible={visible}
    onRequestClose={onClose}
    transparent={true}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Sort by Price</Text>
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButtonItem}>
            <RadioButton
              value="asc"
              status={sortOrder === 'asc' ? 'checked' : 'unchecked'}
              onPress={() => onSortOrderChange('asc')}
            />
            <Text>Price Low to High</Text>
          </View>
          <View style={styles.radioButtonItem}>
            <RadioButton
              value="desc"
              status={sortOrder === 'desc' ? 'checked' : 'unchecked'}
              onPress={() => onSortOrderChange('desc')}
            />
            <Text>Price High to Low</Text>
          </View>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            onApply();
            onClose();
          }}
          style={styles.applyButton}
        >
          Apply
        </Button>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButtonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  applyButton: {
    marginTop: 10,
  },
});

export default FilterModal;
